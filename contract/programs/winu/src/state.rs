use anchor_lang::prelude::*;

#[account]
pub struct Master {
    pub authority: Pubkey,
}

#[account]
pub struct Vault {
    pub balance: u64, 
}
