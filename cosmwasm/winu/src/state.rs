
use cosmwasm_std::Addr;
use cw_storage_plus::Map;
use cosmwasm_schema::cw_serde;

#[cw_serde]
pub struct Tournament {
    pub id: String,
    pub authority: Addr,    
    pub bid_price: u64,    
}

pub const TOURNAMENTS: Map<&str, Tournament> = Map::new("tournaments");
pub const BALANCES: Map<&Addr, u64> = Map::new("balances");

