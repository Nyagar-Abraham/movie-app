import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { PopularMoviesProvider } from "@/context/PopularMoviesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s / CineSphere",
    default: "Welcome /  CineSphere",
  },
  description:
    "CineSphere is your ultimate hub for discovering and streaming movies and series. Explore trending films, binge-worthy shows, and personalized recommendations—all in one sleek, user-friendly app",
  icons: {
    icon: "/assets/icons/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body
        className={`bg-dark100-light0 min-h-svh hide-scrollbar     ${inter.className}`}
      >
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gradient-to-br from-red to-red/70 text-pure-white  border-none",
              footerActionLink: "text-red ",
              socialButtonsBlockButton:
                "text-slate-50 bg-gray-700 hover:bg-gray-600",
            },
            variables: {
              colorPrimary: "#ff6b6b", // Red color in hex format
              colorTextOnPrimaryBackground: "#ffffff", // White color in hex format
              colorBackground: "#212529", // Dark gray color in hex format
              colorInputBackground: "#495057",
              colorText: "#f1f3f5",
              colorNeutral: "#ced4da",
              colorTextSecondary: "#e9ecef",
            },
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <PopularMoviesProvider>
              <Navbar />

              <main className="h-full text-light100-dark0  transition-all duration-300 scrollbar-hidden overflow-y-auto min-h-svh ">
                {children}
              </main>
            </PopularMoviesProvider>
          </ThemeProvider>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
