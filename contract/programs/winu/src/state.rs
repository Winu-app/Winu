use anchor_lang::prelude::*;


#[account]
pub struct Master {
    pub authority: Pubkey,  
}

#[account]
pub struct User {
    pub authority: Pubkey,  
    pub image:Option<String>,           
    pub cover_image:Option<String>,           
    pub username: String,   
    pub wallet_balance: u64,  
    pub my_clan:Option<Pubkey>,
}

#[account]
pub struct Clan {
    pub name: String,  
    pub members: Vec<Pubkey>,     
    pub co_leaders: Vec<Pubkey>,   
    pub leader: Pubkey,
    pub points: i64,
}

#[account]
pub struct Game {
    pub unique_name: String,
    pub name: String, 
    pub start_date: i64,             
    pub end_date: i64,             
    pub clans: Vec<Pubkey>,
    pub is_active: bool,
    pub winner: Option<Pubkey>,
    pub host: Pubkey,
    pub bids: u64,
    pub entry_fee: u32,
}




