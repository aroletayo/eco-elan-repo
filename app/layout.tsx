import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";
import Banner from "@/components/Banner";
import "./globals.css";
import BackToTop from "@/components/BacktopTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen max-w-[100vw] overflow-x-hidden relative  flex flex-col ">
            <BackToTop />
            <Header />
            <Banner />
            <main className="flex-1 pt-5">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
