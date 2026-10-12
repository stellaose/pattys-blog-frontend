"use client";
import React from "react";
import { ProfileLayout } from "#components/layouts";
import { ProfileInformation, ProfilePassword } from "#components/elements";
import { useFieldRequest, useProfile } from "#/hooks";
import { useAppSelector } from "#store/hook";
import { eyebrow } from "#/styles/home";
import {
  profileGrid,
  profileSection,
  profileSectionTitle,
} from "#/styles/profile";

const Settings = () => {
  const user = useAppSelector((state) => state.app.user);

  const { setRequestField } = useFieldRequest();
  const { onUpdateProfile, onUpdatePassword, patchResponse, putResponse } =
    useProfile();

  return (
    <>
      <ProfileLayout>
        <section className={profileSection}>
          <div>
            <p className={eyebrow}>settings</p>
            <h2 className={profileSectionTitle}>Your account</h2>
          </div>

          <div className={profileGrid}>
            <ProfileInformation
              key={user?.updatedAt ?? user?.userId}
              user={user}
              loading={patchResponse.isLoading}
              onFieldChange={setRequestField}
              onSubmit={onUpdateProfile}
            />
            <ProfilePassword
              loading={putResponse.isLoading}
              onFieldChange={setRequestField}
              onSubmit={onUpdatePassword}
            />
          </div>
        </section>
      </ProfileLayout>
    </>
  );
};

export default Settings;
