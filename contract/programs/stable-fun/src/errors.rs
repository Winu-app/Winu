use anchor_lang::prelude::error_code;

#[error_code]
pub enum WinuError {
    #[msg("Only 2 Co Leaders are allowed")]
    MaxCoLeaders,
    #[msg("Clan not found")]
    ClanNotFound,
    #[msg("Co-leader not found")]
    CoLeaderNotFound,
    #[msg("Winner already declared..!")]
    WinnerDeclared,
    #[msg("Insufficient bids! Expected at least 5 bids.")]
    NoBids,
    #[msg("Prize already claimed..!")]
    AlreadyClaimed,
}
