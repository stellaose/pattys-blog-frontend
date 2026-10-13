"use client";
import React from "react";
import { InfoLayout } from "#components/layouts";
import { LegalContent } from "#components/elements";
import { legalLastUpdated, privacySections } from "#/utils/info";

const PrivacyPolicy = () => {
  return (
    <>
      <InfoLayout
        label="legal"
        title="Privacy policy"
        description="What we collect, why we collect it and the choices you have over your information."
        lastUpdated={legalLastUpdated}
      >
        <LegalContent sections={privacySections} />
      </InfoLayout>
    </>
  );
};

export default PrivacyPolicy;
