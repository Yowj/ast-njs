import { Underdog } from "next/font/google";
import "./globals.css";

const underdog = Underdog({
  subsets: ["latin "],
  weight: ["400"],
  display: "swap",
});
export const metadata = {
  title: "Your App",
  description: "Using Underdog font",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
