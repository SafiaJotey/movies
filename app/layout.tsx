
import '@/app/globals.css';
import Providers from '@/providers';
import MenuBar from './components/Menubar';

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
      <MenuBar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
