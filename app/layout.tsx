import { Analytics } from '@vercel/analytics/react';
import { CartProvider } from '@/components/CartContext';
import { WishlistProvider } from '@/components/WishlistContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        <CartProvider>
          <WishlistProvider>
            <div className="flex-grow bg-white">
              {children}
            </div>
            <Analytics />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
