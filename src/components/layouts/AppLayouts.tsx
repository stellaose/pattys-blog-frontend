"use client";
import React from "react";
import { Footer, Header } from ".";
import { useAppSelector } from "#store/hook";
import { useGetLoggedInUser, useAuth } from "#/hooks";
import { Loader } from "#components/general";

export const AppLayouts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const state = useAppSelector((state) => state.app);

  const { data, isLoading } = useGetLoggedInUser(state.isLoggedIn);

  const { onLogout, postResponse } = useAuth();

  if (isLoading || postResponse.isLoading) return <Loader />;

  return (
    <>
      <Header user={data} isLoggedIn={state.isLoggedIn} onLogout={onLogout} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};
