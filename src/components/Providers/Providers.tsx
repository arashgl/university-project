import { MuiThemeProvider } from "./ThemeProvider.tsx";
import { WalletProvider } from "./WalletProvider.tsx";
import { ToastProvider } from "./ToastProvider.tsx";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <MuiThemeProvider>
        <WalletProvider>{children}</WalletProvider>
      </MuiThemeProvider>
    </ToastProvider>
  );
};
