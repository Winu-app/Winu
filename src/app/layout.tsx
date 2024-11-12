import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import XionAbstraction from "@/provider/xion-abstraction";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import TanstackProvider from "@/provider/tanstack-provider";
import ReduxProvider from "@/provider/redux-provider";
import { FileStoreProvider } from "@/helper/edgestore";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "WINU",
  description: "fantasy gaming app for e-sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-dark text-white`}>
        <ReduxProvider>
          <TanstackProvider>
            <NuqsAdapter>
              <Toaster />
              <XionAbstraction>
                <FileStoreProvider>{children}</FileStoreProvider>
              </XionAbstraction>
            </NuqsAdapter>
          </TanstackProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
