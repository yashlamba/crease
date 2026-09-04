import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crease — Cricket rules, finally clear",
  description:
    "Learn cricket one animated step at a time, from the ground and players to the rules that shape every match.",
  openGraph: {
    title: "Crease — Cricket rules, finally clear",
    description: "Learn cricket one animated step at a time.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crease — Cricket rules, finally clear",
    description: "Learn cricket one animated step at a time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
