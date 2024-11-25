use anchor_lang::prelude::*;

mod state;
mod constants;
mod errors;
use crate::{constants::*, state::*, errors::*};

declare_id!("BrTsF5GJNb4jk7jTuYFV3B8YG2cAqWUXrdsFUar5BC6z");

#[program]
mod winu {
    use super::*;

    pub fn init_master(ctx: Context<InitMaster>) -> Result<()> {
        let master = &mut ctx.accounts.master;
        master.authority = ctx.accounts.authority.key();

        Ok(())
    }

    pub fn create_tournament(
        ctx:Context<CreateTournament>,
        name:String, 
        id:String,
        is_active: bool,
        entry_fee:u32
     )->Result<()>{
        let tournament = &mut ctx.accounts.tournament;
        tournament.name = name;
        tournament.id = id;
        tournament.is_active = is_active;
        tournament.entry_fee = entry_fee;
        Ok(())
     }

     pub fn place_bid(ctx:Context<PlaceBid>,)->Result<()>{

        Ok(())
     }
}

#[derive(Accounts)]
#[instruction(
    name:String, 
    id:String,
    is_active: bool,
    entry_fee:u32
)]
pub struct CreateTournament<'info>{
    #[account(
        init,
        seeds=[TOURNAMENT_SEED.as_bytes(), id.as_bytes()],
        bump,
        space = 32 + 8 + 8 + 804 + 1 + 32 + 32 + 8 + 4,
        payer = authority
    )]
    pub tournament: Box<Account<'info, Tournament>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program : Program<'info, System>
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

