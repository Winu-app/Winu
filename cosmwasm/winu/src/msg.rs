use cosmwasm_schema::{cw_serde, QueryResponses};

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    CreateTournament {
        tournament_id: String,
        bid_price: u64,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {}
