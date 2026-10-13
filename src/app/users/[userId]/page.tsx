/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppLayouts } from "#components/layouts";
import { UserProfile } from "#components/elements";
import { useAuthGuard, useGetUserProfile } from "#/hooks";
import { useAppSelector } from "#store/hook";
import { container } from "#/styles/home";
import { profileBody } from "#/styles/profile";

const User = () => {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const currentUserId = useAppSelector((state) => state.app.userId);

  const { isAllowed } = useAuthGuard();

  const isOwnProfile = !!currentUserId && params.userId === currentUserId;

  const { user, blogs, isLoading } = useGetUserProfile(
    isAllowed && !isOwnProfile ? params.userId : undefined,
  );

  useEffect(() => {
    if (isOwnProfile) {
      router.replace("/profile/my-blogs");
    }
  }, [isOwnProfile]);

  if (!isAllowed || isOwnProfile) return null;

  return (
    <>
      <AppLayouts>
        <div className={profileBody}>
          <div className={container}>
            <UserProfile
              user={user}
              blogs={blogs}
              userId={currentUserId}
              isLoading={isLoading}
            />
          </div>
        </div>
      </AppLayouts>
    </>
  );
};

export default User;
