use anchor_lang::{
    prelude::*,
    solana_program::{program::invoke, system_instruction::transfer},
};

mod constants;
mod errors;
mod state;
use crate::{constants::*, errors::*, state::*};

declare_id!("BrTsF5GJNb4jk7jTuYFV3B8YG2cAqWUXrdsFUar5BC6z");

#[program]
pub mod winu {
    use super::*;

    pub fn init_master(ctx: Context<InitMaster>) -> Result<()> {
        let master = &mut ctx.accounts.master;
        let authority = &ctx.accounts.authority;
        master.owner = authority.key();
        Ok(())
    }

    pub fn get_balance(ctx: Context<GetBalance>, _venue_id: String) -> Result<u64> {
        let balance = ctx.accounts.venue.to_account_info().lamports();

        msg!("Balance in lamports: {}", balance);

        return Ok(balance);
    }

    pub fn create_venue(ctx: Context<CreateVenue>, venue_id: String) -> Result<()> {
        let venue = &mut ctx.accounts.venue;

        venue.id = venue_id;
        venue.authority = ctx.accounts.authority.key();
        venue.bid_price = 1_000_000_000;

        msg!("Created Venue :{}!", venue.id);
        msg!("Bid Prize :{}!", venue.bid_price);
        Ok(())
    }

    pub fn place_bid(ctx: Context<PlaceBid>, venue_id: String, bid_id: String) -> Result<()> {
        let venue = &mut ctx.accounts.venue;
        let bid = &mut ctx.accounts.bid;
        let buyer = &ctx.accounts.buyer;

        // Transfer SOL
        invoke(
            &transfer(&buyer.key(), &venue.key(), venue.bid_price),
            &[
                buyer.to_account_info(),
                venue.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        venue.bid_count += 1;
        bid.id = bid_id;
        bid.venue_id = venue_id;
        bid.authority = buyer.key();
        msg!("Bid Successful:: {}", bid.id);
        Ok(())
    }

    pub fn pick_winner(ctx: Context<PickWinner>, _venue_id: String, winner: Pubkey) -> Result<()> {
        let venue = &mut ctx.accounts.venue;
        let host = &ctx.accounts.authority;
        let _master = &ctx.accounts.master;
        let master_owner_account = &mut ctx.accounts.master_owner_account;

        let scaling_factor: u64 = 1000000000;
        let minimum_lamports = 1;

        let scaled_bid_count = venue.bid_count * scaling_factor;

        let thirty_five_percent = std::cmp::max(scaled_bid_count * 35 / 100, minimum_lamports);
        let ten_percent = std::cmp::max(scaled_bid_count * 10 / 100, minimum_lamports);

        if venue.winner.is_some() {
            return err!(VenueError::WinnerDeclared);
        }
        if venue.bid_count < 5 {
            return err!(VenueError::NoBids);
        }
        //Venue Host Payment
        **venue.to_account_info().try_borrow_mut_lamports()? -= thirty_five_percent;
        **host.to_account_info().try_borrow_mut_lamports()? += thirty_five_percent;

        //Platform Payment
        **venue.to_account_info().try_borrow_mut_lamports()? -= ten_percent;
        **master_owner_account
            .to_account_info()
            .try_borrow_mut_lamports()? += ten_percent;

        venue.winner = Some(winner);

        msg!(
            "{} received {} lamports for the venue {}",
            host.key(),
            thirty_five_percent,
            venue.id
        );

        Ok(())
    }

    pub fn claim_prize(ctx: Context<ClaimPrize>, _venue_id: String, _bid_id: String) -> Result<()> {
        let venue = &mut ctx.accounts.venue;
        let bid = &ctx.accounts.bid;
        let winner = &ctx.accounts.authority;

        let scaling_factor: u64 = 1000000000;

        let fifty_percent = venue.bid_count * scaling_factor / 2;

        if venue.claimed {
            return err!(VenueError::AlreadyClaimed);
        }

        if venue.winner != Some(winner.key()) {
            return err!(VenueError::ActionDenied);
        }

        **venue.to_account_info().try_borrow_mut_lamports()? -= fifty_percent;
        **winner.to_account_info().try_borrow_mut_lamports()? += fifty_percent;

        venue.claimed = true;

        msg!(
            "{} claimed {} lamports for the bid {}",
            winner.key(),
            fifty_percent,
            bid.id
        );

        Ok(())
    }

}

#[derive(Accounts)]
pub struct InitMaster<'info> {
    #[account(
        init,  
        seeds = [MASTER_SEED.as_bytes()], 
        bump,  
        payer = authority,  
        space = 8 + std::mem::size_of::<Master>(),  )]
    pub master: Box<Account<'info, Master>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(venue_id:String, bid_id: String)]
pub struct ClaimPrize<'info> {
    #[account(
        mut,
        seeds=[VENUE_SEED.as_bytes(), &venue_id.as_bytes()],
        bump,
    )]
    pub venue: Account<'info, Venue>,

    #[account(
        mut,
        seeds=[
            BID_SEED.as_bytes(),
            venue.key().as_ref(),
            &bid_id.as_bytes()
         ],
        bump,
        has_one = authority
    )]
    pub bid: Account<'info, Bid>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(venue_id:String, winner: Pubkey)]
pub struct PickWinner<'info> {
    #[account(
        mut,
        seeds=[VENUE_SEED.as_bytes(), &venue_id.as_bytes()],
        bump,
        has_one = authority
    )]
    pub venue: Account<'info, Venue>,

    #[account(
        mut,
        seeds=[MASTER_SEED.as_bytes()],
        bump,
    )]
    pub master: Account<'info, Master>,

    #[account(mut)]
    pub master_owner_account: AccountInfo<'info>,

    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(venue_id:String, bid_id:String)]
pub struct PlaceBid<'info> {
    #[account(
        mut,
        seeds=[VENUE_SEED.as_bytes(), &venue_id.as_bytes()],
        bump
        )]
    pub venue: Account<'info, Venue>,

    #[account(
        init,
        payer=buyer,
        space= 16 + std::mem::size_of::<Bid>(),
        seeds=[
            BID_SEED.as_bytes(),
            venue.key().as_ref(),
            &bid_id.as_bytes()
            ],
        bump
    )]
    pub bid: Account<'info, Bid>,

    #[account(mut)]
    pub buyer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(venue_id:String)]
pub struct CreateVenue<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 8 + 4 + 33 + 1,
        seeds = [VENUE_SEED.as_bytes(), &venue_id.as_bytes()],
        bump
    )]
    pub venue: Account<'info, Venue>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
#[instruction(venue_id:String)]
pub struct GetBalance<'info> {
    #[account(
        mut,
        seeds = [VENUE_SEED.as_bytes(), &venue_id.as_bytes()],
        bump
    )]
    pub venue: Account<'info, Venue>,
    pub system_program: Program<'info, System>,
}
