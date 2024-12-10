use anchor_lang::prelude::*;
#[account]
pub struct Bid {
    pub id: String,
    pub authority: Pubkey,
    pub venue_id: String,
}

#[account]
pub struct Venue {
    pub id: String,
    pub authority: Pubkey,
    pub bid_price: u64,
    pub bid_count: u64,
    pub winner: Option<Pubkey>,
    pub claimed: bool,
}

#[account]
pub struct Master {
    pub owner: Pubkey,
}
