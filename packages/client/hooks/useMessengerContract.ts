import { BigNumber } from 'ethers';

export type Message = {
  sender: string;
  receiver: string;
  depositInWei: BigNumber;
  timestamp: Date;
  text: string;
  isPending: boolean;
};
