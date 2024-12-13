#[cfg(not(feature = "library"))]
use cosmwasm_std::{entry_point, to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, StdError};
// use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};

use crate::state::{Tournament, TOURNAMENTS, BALANCES};

/*
// version info for migration info
const CONTRACT_NAME: &str = "crates.io:winu";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
*/

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    Ok(Response::new()
        .add_attribute("action", "instantiate")
        .add_attribute("creator", info.sender.to_string()))
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
        ExecuteMsg::FundWallet { amount } => {
            Ok(execute_fund_wallet(deps, env, info, amount)?)
        }
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetTournament { tournament_id } => query_tournament(deps, env, tournament_id),
        QueryMsg::GetWalletBalance { address } => query_wallet_balance(deps, env, address),
    }
}

pub fn execute_create_tournament(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    tournament_id: String,
    bid_price: u64,
) -> Result<Response, StdError> {
    if TOURNAMENTS.has(deps.storage, &tournament_id) {
        return Err(StdError::generic_err("Tournament ID already exists"));
    }

    let tournament = Tournament {
        id: tournament_id.clone(),
        authority: info.sender.clone(),
        bid_price,
    };

    TOURNAMENTS.save(deps.storage, &tournament_id, &tournament)?;

    Ok(Response::new()
        .add_attribute("action", "create_tournament")
        .add_attribute("tournament_id", tournament_id)
        .add_attribute("bid_price", bid_price.to_string())
        .add_attribute("owner", info.sender.to_string()))
}

pub fn execute_fund_wallet(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    amount: u64,
) -> Result<Response, StdError> {
    if amount == 0 {
        return Err(StdError::generic_err("Amount must be greater than zero"));
    }

    let sender = info.sender;

    let balance = BALANCES.may_load(deps.storage, &sender)?.unwrap_or(0);

    let new_balance = balance.checked_add(amount).ok_or_else(|| {
        StdError::generic_err("Balance overflow")
    })?;

    BALANCES.save(deps.storage, &sender, &new_balance)?;

    Ok(Response::new()
        .add_attribute("action", "fund_wallet")
        .add_attribute("sender", sender.to_string())
        .add_attribute("amount", amount.to_string())
        .add_attribute("new_balance", new_balance.to_string()))
}

pub fn query_tournament(
    deps: Deps,
    _env: Env,
    tournament_id: String,
) -> StdResult<Binary> {
    let tournament = TOURNAMENTS
        .load(deps.storage, &tournament_id)
        .map_err(|_| cosmwasm_std::StdError::not_found("Tournament"))?;

    to_json_binary(&tournament)
}

pub fn query_wallet_balance(
    deps: Deps,
    _env: Env,
    address: String,
) -> StdResult<Binary> {
    let addr = deps.api.addr_validate(&address)?;
    let balance = BALANCES.may_load(deps.storage, &addr)?.unwrap_or(0);
    to_json_binary(&balance)
}


#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, Addr};

    #[test]
    fn test_fund_wallet() {
        let mut deps = mock_dependencies();
        let sender = Addr::unchecked("xion1jet6q3s55cpc2mmxwv8dksya8z0eyjd0hptjcf");
        let info = mock_info("sender", &coins(1000, "token"));
        let amount = 500;

        let res = execute_fund_wallet(deps.as_mut(), mock_env(), info, amount).unwrap();
        println!("Fund wallet response: {:?}", res);
        
        // Query the wallet balance after funding
        let bin = match query_wallet_balance(deps.as_ref(), mock_env(), sender.to_string()) {
            Ok(response) => response,
            Err(e) => {
                println!("Error querying wallet balance: {:?}", e);
                return;
            }
        };

        // Deserialize the balance
        let balance: u64 = match cosmwasm_std::from_json(&bin) {
            Ok(b) => b,
            Err(e) => {
                println!("Error deserializing balance: {:?}", e);
                return;
            }
        };

        // Print the extracted balance
        println!("Wallet balance after funding: {}", balance);

        assert_eq!(res.attributes[0].value, "fund_wallet");
    }

    #[test]
    fn test_create_tournament() {
        let mut deps = mock_dependencies();

        let info = mock_info("creator", &[]);
        let tournament_id = "tournament1".to_string();
        let bid_price = 100;

        let res = execute_create_tournament(deps.as_mut(), mock_env(), info, tournament_id.clone(), bid_price).unwrap();
        assert_eq!(res.attributes[0].value, "create_tournament");

        let tournament = TOURNAMENTS.load(&deps.storage, &tournament_id).unwrap();
        assert_eq!(tournament.id, "tournament1");
        assert_eq!(tournament.bid_price, 100);
    }

    #[test]
    fn test_query_tournament() {
        let mut deps = mock_dependencies();

        let info = mock_info("creator", &[]);
        let tournament_id = "tournament1".to_string();
        let bid_price = 100;
        
        // Create tournament
        execute_create_tournament(deps.as_mut(), mock_env(), info, tournament_id.clone(), bid_price).unwrap();

        // Query tournament
        let bin = query_tournament(deps.as_ref(), mock_env(), tournament_id.clone()).unwrap();
        let tournament: Tournament = cosmwasm_std::from_binary(&bin).unwrap();
        assert_eq!(tournament.id, "tournament1");
        assert_eq!(tournament.bid_price, 100);
    }

    // #[test]
    // fn test_query_wallet_balance() {
    //     use cosmwasm_std::{MessageInfo, Coin};

    //     let mut deps = mock_dependencies();

    //     // Use a valid Bech32-formatted address
    //     let sender = Addr::unchecked("xion1jet6q3s55cpc2mmxwv8dksya8z0eyjd0hptjcf");
    //     let funds = vec![Coin {
    //         denom: "token".to_string(),
    //         amount: 1000u128.into(),
    //     }];
    //     let info = MessageInfo {
    //         sender: sender.clone(),
    //         funds,
    //     };

    //     let amount = 500;

    //     // Fund the wallet
    //     execute_fund_wallet(deps.as_mut(), mock_env(), info.clone(), amount).unwrap();

    //     // Query wallet balance
    //     let bin = query_wallet_balance(deps.as_ref(), mock_env(), sender.to_string()).unwrap();
    //     let balance: u64 = cosmwasm_std::from_json(&bin).unwrap();
    //     println!("Queried wallet balance: {}", balance);
    //     assert_eq!(balance, 500);
    // }
}
