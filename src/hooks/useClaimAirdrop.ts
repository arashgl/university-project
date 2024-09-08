import { getContract, prepareContractCall } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { client } from "../components/Providers/WalletProvider.tsx";
import { useSendTransaction } from "thirdweb/react";
import { toast } from "react-toastify";
import usePopUpStore from "./store/usePopup.ts";

export const airDropContract = getContract({
  address: import.meta.env.VITE_AIRDROP_ADDRESS,
  chain: polygon,
  client,
});

export const useClaimAirdrop = () => {
  const closePopup = usePopUpStore((state) => state.close);

  const {
    data: transactionResult,
    mutateAsync,
    isPending,
  } = useSendTransaction();
  const claim = () => {
    const transaction = prepareContractCall({
      contract: airDropContract,
      method: "function claim() payable",
      params: [],
      value: BigInt(10000000000000000n),
    });
    mutateAsync(transaction)
      .then(() => {
        toast.success("Transaction successful");
        closePopup();
      })
      .catch((e) => {
        console.log(e.message);
        toast.error("Transaction failed" + "\n" + e?.message);
      });
  };
  return { claim, transactionResult, isPending };
};
