"use client";
import React from "react";
import { InfoLayout } from "#components/layouts";
import { AboutContent } from "#components/elements";
import { useAppSelector } from "#store/hook";

const AboutUs = () => {
  const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn);

  return (
    <>
      <InfoLayout
        label="about us"
        title="A calm place for good ideas"
        description="Pattys is a community where we read, share and grow through ideas that matter."
      >
        <AboutContent isLoggedIn={isLoggedIn} />
      </InfoLayout>
    </>
  );
};

export default AboutUs;
