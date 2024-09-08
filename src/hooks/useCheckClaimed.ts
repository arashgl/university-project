import { useActiveAccount, useReadContract } from "thirdweb/react";
import { airDropContract } from "./useClaimAirdrop.ts";

export const useCheckClaimed = () => {
  const account = useActiveAccount();
  return useReadContract({
    contract: airDropContract,
    method: "function hasClaimed(address) view returns (bool)",
    params: [account?.address as string],
  });
};
