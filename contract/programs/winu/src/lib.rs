use anchor_lang::prelude::*;
// use chainlink_solana as chainlink;
// use chainlink_solana::Round;

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

    pub fn register_user(
        ctx:Context<RegisterUser>,
        username: String,   
        image:String,       
        cover_image:String,           
    ) -> Result<()>{
        let user = &mut ctx.accounts.user;
        user.username = username;
        user.cover_image = Some(cover_image);
        user.image = Some(image);
        user.wallet_balance = 0;
        msg!("User {} Registered Successfully", user.username);
        Ok(())
    }

    pub fn create_clan(
        ctx:Context<CreateClan>, 
        name:String,
     ) -> Result<()>{
        let clan = &mut ctx.accounts.clan;
        clan.name = name;
        clan.leader = ctx.accounts.authority.key();
        msg!("{} Clan Created", clan.name);
        Ok(())
    }

    pub fn add_co_leader(
        ctx:Context<AddCoLeader>,
        new_co:Pubkey,
        clan_name:String
    ) -> Result<()>{
        let clan = &mut ctx.accounts.clan;
        let co_len = clan.co_leaders.len();
        if  co_len >= 2 {
            return err!(WinuError::MaxCoLeaders);
        }
        clan.co_leaders.push(new_co);
        Ok(())
    }
    pub fn add_clan_member(
        ctx:Context<AddClanMember>,
        new_member:Pubkey,
        clan_name:String
    ) -> Result<()>{
        let clan = &mut ctx.accounts.clan;
        let co_len = clan.members.len();
        if  co_len >= 10 {
            return err!(WinuError::MaxMembers);
        }
        clan.members.push(new_member);
        Ok(())
    }

    pub fn remove_co_leader(
        ctx:Context<RemoveCoLeader>,
        co_leader:Pubkey,
        clan_name:String
    ) -> Result<()>{
        let clan = &mut ctx.accounts.clan;
        if let Some(index) = clan.co_leaders.iter().position(|&x| x == co_leader) {
            clan.co_leaders.remove(index);
            msg!("Co-leader {} removed successfully", co_leader);
            Ok(())
        } else {
            return err!(WinuError::CoLeaderNotFound);
        }
    }
    pub fn remove_clan_member(
        ctx:Context<RemoveClanMember>,
        member:Pubkey,
        _clan_name:String
    ) -> Result<()>{
        let clan = &mut ctx.accounts.clan;
        if let Some(index) = clan.co_leaders.iter().position(|&x| x == member) {
            clan.members.remove(index);
            msg!("Member {} removed successfully", member);
            Ok(())
        } else {
            return err!(WinuError::CoLeaderNotFound);
        }
    }

}

#[derive(Accounts)]
#[instruction(new_co:Pubkey,clan_name:String)]
pub struct RemoveCoLeader<'info>{
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
#[instruction(member:Pubkey,clan_name:String)]
pub struct RemoveClanMember<'info>{
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
#[instruction(new_member:Pubkey,clan_name:String)]
pub struct AddClanMember<'info>{
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
)]
pub struct CreateClan<'info>{
    #[account(
        init,
        seeds = [CLAN_SEED.as_bytes(), name.as_bytes()],
        bump,
        payer = authority,
        space = 24 + 344 + 88 + 32 + 8,
    )]
    pub clan: Box<Account<'info, Clan>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>

}

#[derive(Accounts)]
#[instruction(
        username: String, 
        image: String, 
        cover_image: String
    )]
pub struct RegisterUser<'info>{
    #[account(
        init,
        seeds=[USER_SEED.as_bytes(), username.as_bytes()],
        bump,
        payer=authority,
        space = 8 + 4 + 32 + 4 + 255 + 4 + 255 + 16,
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

