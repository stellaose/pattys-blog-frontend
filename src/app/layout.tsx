import type { Metadata } from "next";
import "./globals.css";
import { getThemeConfig } from "#config/theme";
import { App as AntApp, ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";

export const metadata: Metadata = {
  title: "Pattys",
  description: "A blog for Pattys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider theme={getThemeConfig()} locale={enUS}>
        <body suppressHydrationWarning className="min-h-full flex flex-col">
          <main>
            <AntApp>{children}</AntApp>
          </main>
        </body>
      </ConfigProvider>
    </html>
  );
}
