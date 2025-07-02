import "./globals.css";
import GlassmorphNavbar from "@/components/Navbar";
import { ItemsProvider } from "@/context/ItemsContext";
import { CartProvider } from "@/context/CartContext";
import ReactQueryProvider from "@/components/ReactQueryProvider";

export const metadata = {
  title: "The Next Store",
  description: "A modern Next.js e-commerce demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ItemsProvider>
            <CartProvider>
              <GlassmorphNavbar />
              {children}
            </CartProvider>
          </ItemsProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
