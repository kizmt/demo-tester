import { create } from 'zustand'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

interface UserSOLBalanceStore {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set) => ({
  balance: 0,
  getUserSOLBalance: async (publicKey, connection) => {
    try {
      const balanceInLamports = await connection.getBalance(publicKey, 'confirmed');
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
      set(() => ({ balance: balanceInSOL }));
      console.log(`balance updated: ${balanceInSOL} SOL`);
    } catch (e) {
      console.log(`error getting balance: `, e);
    }
  },
}));

export default useUserSOLBalanceStore;
