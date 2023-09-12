// app/layout.tsx
import { Providers } from "./providers";
import type { Metadata } from "next";

interface CustomMetadata extends Metadata {
  title: string;
  description: string;
}

export const metadata: CustomMetadata = {
  title: "FACE CHECKER",
  description: "I'm testing this app",
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
