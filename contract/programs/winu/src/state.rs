use anchor_lang::prelude::*;

#[account]
pub struct Master {
    pub authority: Pubkey,  
}

#[account]
pub struct Tournament {
    pub id: String,
    pub name: String, 
    pub is_active: bool,
    pub winner: Option<Pubkey>,
    pub reward_claimed: bool,
    pub host: Pubkey,
    pub bid_count: u64,
    pub entry_fee: u32,
}

#[account]
pub struct User {
    pub authority: String,
    pub balance: u64, 
}




