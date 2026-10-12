"use client";
import { AppLayouts, FeedLayout } from "#components/layouts";
import { Feed } from "#components/elements";
import { useAuthGuard } from "#/hooks";
import { useAppSelector } from "#store/hook";

export default function Dashboard() {
  const user = useAppSelector((state) => state.app.user);

  const { isAllowed } = useAuthGuard();

  if (!isAllowed) return null;

  return (
    <>
      <AppLayouts>
        <FeedLayout user={user}>
          <Feed />
        </FeedLayout>
      </AppLayouts>
    </>
  );
}
