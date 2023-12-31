import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Navbar from "~/app/_components/NavBar/page";
import Sidebar from "~/app/_components/SideBar/page";
import { TRPCReactProvider } from "~/trpc/react";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      
      <html lang="en">
        <body className={`font-sans ${inter.variable} min-h-screen flex flex-col`}>
            <TRPCReactProvider cookies={cookies().toString()}>
              <Navbar />
              <div className="flex flex-row h-full flex-grow">
                <Sidebar />
                <main className="flex w-full flex-grow px-6 mt-4">
                  {children}
                </main>
              </div>
            </TRPCReactProvider>
        </body>
      </html>
    
  );
}
