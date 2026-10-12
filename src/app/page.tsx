"use client";
import { AppLayouts, HomeLayout } from "#components/layouts";
import { Stories } from "#components/elements";

export default function Home() {
  return (
    <>
      <AppLayouts>
        <HomeLayout>
          <Stories />
        </HomeLayout>
      </AppLayouts>
    </>
  );
}
