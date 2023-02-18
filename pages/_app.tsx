import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
