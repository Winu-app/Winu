use anchor_lang::prelude::error_code;

#[error_code]
pub enum VenueError {
    #[msg("You cannot perform this action..!")]
    ActionDenied,
    #[msg("Winner already declared..!")]
    WinnerDeclared,
    #[msg("Insufficient bids! Expected at least 5 bids.")]
    NoBids,
    #[msg("Prize already claimed..!")]
    AlreadyClaimed,
}
