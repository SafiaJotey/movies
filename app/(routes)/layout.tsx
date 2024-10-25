import '@/app/globals.css';

import Providers from "@/app/lib/utils/providers"
export const metadata = {
  title: 'Movies App',
  description: 'Search for movies with TMDB API',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
