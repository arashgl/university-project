import usePopUpStore from "../../hooks/store/usePopup.ts";
import { AnimatePresence, motion } from "framer-motion";
import {
  bannerPopupVariants,
  ButtonsContainer,
  ButtonStyled,
  LoadingButtonStyled,
  PopupBodyStyled,
  PStyled,
} from "./PopUp.styled.ts";
import {
  ConnectButton,
  useActiveAccount,
  useConnectModal,
} from "thirdweb/react";
import { client } from "../Providers/WalletProvider.tsx";
import { createWallet } from "thirdweb/wallets";
import { useClaimAirdrop } from "../../hooks/useClaimAirdrop.ts";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useCheckClaimed } from "../../hooks/useCheckClaimed.ts";
export const Popup = () => {
  const isOpen = usePopUpStore((state) => state.isOpen);
  const toggleIsOpen = usePopUpStore((state) => state.toggleIsOpen);
  const activeAccount = useActiveAccount();
  const { connect } = useConnectModal();
  const [clicked, setClicked] = useState(false);
  async function handleConnect() {
    await connect({
      client,
      wallets: [
        createWallet("io.metamask"),
        createWallet("com.trustwallet.app"),
        createWallet("com.coinbase.wallet"),
        createWallet("walletConnect"),
      ],
    }); // opens the connect modal
  }
  const { isLoading, data: hasClaimed } = useCheckClaimed();
  const { claim, isPending, transactionResult } = useClaimAirdrop();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{
            transform: "translate(0, 0)",
            position: "absolute",
            top: "45%",
            left: "25%",
            width: "50vw",
          }}
          variants={bannerPopupVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          exit="exit"
        >
          <PopupBodyStyled>
            <PStyled>Claim your airdrop</PStyled>
            {activeAccount && <ConnectButton client={client} />}
            {transactionResult?.transactionHash && (
              <PStyled
                sx={{
                  fontSize: 14,
                }}
              >
                {transactionResult?.transactionHash.slice(0, 10) +
                  "..." +
                  transactionResult?.transactionHash.slice(55, -1)}

                {clicked ? (
                  <DoneIcon />
                ) : (
                  <ContentCopyIcon
                    onClick={() => {
                      if (transactionResult?.transactionHash) {
                        setClicked(true);
                        setTimeout(() => {
                          setClicked(false);
                        }, 3000);
                        navigator.clipboard.writeText(
                          transactionResult?.transactionHash,
                        );
                      }
                    }}
                  />
                )}
              </PStyled>
            )}

            {/*<PStyled>{transactionResult}</PStyled>*/}
            <ButtonsContainer>
              <ButtonStyled
                onClick={() => {
                  toggleIsOpen();
                }}
              >
                Cancel
              </ButtonStyled>
              {activeAccount ? (
                <LoadingButtonStyled
                  loading={isPending || isLoading}
                  disabled={hasClaimed}
                  onClick={claim}
                >
                  {hasClaimed ? "You Already claimed your reward" : "Claim"}
                </LoadingButtonStyled>
              ) : (
                <ButtonStyled onClick={handleConnect}>
                  Connect Your Wallet
                </ButtonStyled>
              )}
            </ButtonsContainer>
          </PopupBodyStyled>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
