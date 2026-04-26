import type { Metadata } from "next";
import "./globals.css";
import { getThemeConfig } from "#config/theme";
import { App as AntApp, ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import { RouteProgress } from "#components/general";

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
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <RouteProgress />
        <ConfigProvider theme={getThemeConfig()} locale={enUS}>
          <main>
            <AntApp>{children}</AntApp>
          </main>
        </ConfigProvider>
      </body>
    </html>
  );
}
