import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID as string,
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
};
