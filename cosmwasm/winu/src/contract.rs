#[cfg(not(feature = "library"))]
use cosmwasm_std::{entry_point, to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,StdError};
// use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};

use crate::state::{Tournament, TOURNAMENTS};

/*
// version info for migration info
const CONTRACT_NAME: &str = "crates.io:winu";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
*/

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    unimplemented!()
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::CreateTournament { tournament_id, bid_price } => {
            Ok(execute_create_tournament(deps, env, info, tournament_id, bid_price)?)
        }
        // TODO:: Other ExecuteMsg variants
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {

    match msg {
        QueryMsg::GetTournament { tournament_id } => query_tournament(deps, env, tournament_id),
    }
    // unimplemented!()

     // TODO:: Other query variants
}

#[cfg(test)]
mod tests {}


pub fn execute_create_tournament(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    tournament_id: String,
    bid_price: u64,
) -> Result<Response, StdError> {
    // Validate input
    if TOURNAMENTS.has(deps.storage, &tournament_id) {
        return Err(StdError::generic_err("Tournament ID already exists"));
    }

    // Create a new tournament
    let tournament = Tournament {
        id: tournament_id.clone(),
        authority: info.sender.clone(), // Set the sender as the owner
        bid_price,
    };

    // Store the tournament in state
    TOURNAMENTS.save(deps.storage, &tournament_id, &tournament)?;

    // Log success
    Ok(Response::new()
        .add_attribute("action", "create_tournament")
        .add_attribute("tournament_id", tournament_id)
        .add_attribute("bid_price", bid_price.to_string())
        .add_attribute("owner", info.sender.to_string()))
}


pub fn query_tournament(
    deps: Deps,
    _env: Env,
    tournament_id: String,
) -> StdResult<Binary> {
    // Retrieve the tournament by ID from storage
    let tournament = TOURNAMENTS
        .load(deps.storage, &tournament_id)
        .map_err(|_| cosmwasm_std::StdError::not_found("Tournament"))?;

    // Return the tournament data as JSON
    to_json_binary(&tournament)
}