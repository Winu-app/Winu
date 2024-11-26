use anchor_lang::prelude::*;
use solana_program::program::invoke;
use solana_program::system_instruction;
mod constants;
mod errors;
mod state;
use crate::{constants::*, errors::*, state::*};

declare_id!("BrTsF5GJNb4jk7jTuYFV3B8YG2cAqWUXrdsFUar5BC6z");

#[program]
mod winu {
    use super::*;

    // Initialize the master account with an authority
    pub fn init_master(ctx: Context<InitMaster>) -> Result<()> {
        let master = &mut ctx.accounts.master;
        master.authority = ctx.accounts.authority.key();
        Ok(())
    }

    pub fn init_vault(ctx: Context<InitVault>, _user_id: String) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.balance = 0;
        Ok(())
    }

    // Deposit SOL to the vault (contract)
    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        let ix = system_instruction::transfer(
            &ctx.accounts.user.key(),
            &ctx.accounts.vault.key(),
            amount,
        );
        invoke(
            &ix,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.vault.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        let vault = &mut ctx.accounts.vault;

        vault.balance += amount;

        Ok(())
    }

    // Withdraw SOL from the vault (contract) to the user's wallet
    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let ix = system_instruction::transfer(
            &ctx.accounts.vault.key(),
            &ctx.accounts.authority.key(),
            amount,
        );
        invoke(
            &ix,
            &[
                ctx.accounts.vault.to_account_info(),
                ctx.accounts.authority.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;
        

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
        space = 8 + std::mem::size_of::<Master>(),
    )]
    pub master: Box<Account<'info, Master>>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(user_id:String)]
pub struct InitVault<'info> {
    #[account(
        init,
        seeds = [VAULT_SEED.as_bytes(),user_id.as_bytes()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<Vault>(),
    )]
    pub vault: Box<Account<'info, Vault>>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(user_id:String)]
pub struct Withdraw<'info> {
    #[account(
        mut,
        seeds = [VAULT_SEED.as_bytes(), user_id.as_bytes()], 
        bump
    )]
    pub vault: Account<'info, Vault>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
