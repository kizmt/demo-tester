import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

export const OPENBOOK_PROGRAM_ID = new PublicKey('opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb');

export const WRAPPED_SOL_MINT = new PublicKey('So11111111111111111111111111111111111111112');

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

export const ARCANA_DATA_API_URL = 'https://alpha.arcana.markets/api/openbookv2/markets'

export const DEFAULT_MARKET_ID = '5hYMkB5nAz9aJA33GizyPVH3VkqfkG7V4S2B5ykHxsiM';

export const DEFAULT_MARKET_NAME = 'SOL-USDC'
export const MIN_SOL_BALANCE = 0.001
export const MAX_PRIORITY_FEE_KEYS = 128
export const DAILY_SECONDS = 86400
export const DAILY_MILLISECONDS = 86400000
export const NUMERAL_FORMAT = '0,0.00';
export const BASE_FORMAT = '0,0';
export const QUOTE_LOTS = 0.0001;
export const BN_0 = new BN(0);