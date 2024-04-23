import "./ui/global.css";
import { inter } from "@/app/ui/fonts";
import NavBar from "@/app/ui/elements/navbar";
import Footer from "@/app/ui/elements/footer";

export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <html lang="en">
    <body className={inter.className}>
    <div id={"hydrate-root"}>
      <NavBar />
      {children}
      <Footer />
    </div>
    </body>
    </html>
  );
}