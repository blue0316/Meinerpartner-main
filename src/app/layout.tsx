// Import Custom Components
import AuthProvider from "@/components/authProvider/AuthProvider";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

// Import Plugins Styles
import "swiper/swiper.min.css";
import "react-toastify/dist/ReactToastify.min.css";

// Import Global Styles
import "../styles/globals.scss";
import dynamic from "next/dynamic";
import Toastify from "@/components/features/Toastify";
import { NextAuthProvider } from "./providers";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page-wrapper font-openSans">
          <NextAuthProvider>
            <AuthProvider>
              <Header />
              {children}
              <Footer />
              <Toastify />
            </AuthProvider>
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
