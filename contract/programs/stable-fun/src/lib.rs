use anchor_lang::prelude::*;
use chainlink_solana as chainlink;
use chainlink_solana::Round;

mod state;
mod constants;
use crate::{constants::*, state::*};

declare_id!("BrTsF5GJNb4jk7jTuYFV3B8YG2cAqWUXrdsFUar5BC6z");

#[program]
mod winu {
    use super::*;

    pub fn init_master(ctx: Context<InitMaster>) -> Result<()> {
        let master = &mut ctx.accounts.master;
        master.authority = ctx.accounts.authority.key();

        Ok(())
    }

    pub fn register_user(
        ctx:Context<RegisterUser>,
        image:String,       
        cover_image:String,           
        username: String,   
        wallet_balance: u64,  
        my_clan:Pubkey
    ) -> Result<()>{
        let user = &mut ctx.accounts.user;
        user.username = username;
        user.cover_image = Some(cover_image);
        user.image = Some(image);
        user.wallet_balance = 0;
        user.my_clan = Some(my_clan);
        msg!("User {} Registered Successfully", user.username);
        Ok(())
    }

    pub fn create_clan(
        ctx:Context<CreateClan>, 
        name:String,
        members: [Pubkey; 10],     
        co_leaders: [Pubkey; 2],   
     ) -> Result<()>{
        let clan = &mut ctx.accounts.clan;
        clan.name = name;
        clan.members=Some(members);
        clan.co_leaders = Some(co_leaders);
        msg!("{} Clan Created", clan.name);
        Ok(())
    }

    pub fn add_co_leader(
        ctx:Context<AddCoLeader>,
        new_co:Pubkey,
        clan_name:String
    ) -> Result<()>{

        Ok(())
    }

}

#[derive(Accounts)]
#[instruction(new_co:Pubkey,clan_name:String)]
pub struct AddCoLeader<'info>{
    #[account(
        mut,
        seeds = [CLAN_SEED.as_bytes(), clan_name.as_bytes()],
        bump
    )]
    pub clan: Box<Account<'info, Clan>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}




#[derive(Accounts)]
#[instruction(
    name:String,
    members: [Pubkey; 10],     
    co_leaders: [Pubkey; 2], 
)]
pub struct CreateClan<'info>{
    #[account(
        init,
        seeds = [CLAN_SEED.as_bytes(), name.as_bytes()],
        bump,
        payer = authority,
        space = 16 + std::mem::size_of::<Clan>(),
    )]
    pub clan: Box<Account<'info, Clan>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>

}

#[derive(Accounts)]
#[instruction( 
    image:String,       
    cover_image:String,           
    username: String,   
    wallet_balance: u64,
    my_clan:Pubkey
 )]
pub struct RegisterUser<'info>{
    #[account(
        init,
        seeds=[USER_SEED.as_bytes(), username.as_bytes()],
        bump,
        payer=authority,
        space= 24 + std::mem::size_of::<User>(),
    )]
    pub user:Box<Account<'info, User>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info,System>

}



#[derive(Accounts)]
pub struct InitMaster<'info> {
    #[account(
        init, 
        seeds=[MASTER_SEED.as_bytes()],
        bump,
        payer = authority,
        space= 8+ std::mem::size_of::<Master>(),
    )]
    pub master: Box<Account<'info, Master>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

