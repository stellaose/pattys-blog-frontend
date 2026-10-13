"use client";
import React from "react";
import { InfoLayout } from "#components/layouts";
import { LegalContent } from "#components/elements";
import { legalLastUpdated, termsSections } from "#/utils/info";

const TermsAndConditions = () => {
  return (
    <>
      <InfoLayout
        label="legal"
        title="Terms & conditions"
        description="The rules for using Pattys, written to be read. Please take a few minutes to go through them."
        lastUpdated={legalLastUpdated}
      >
        <LegalContent sections={termsSections} />
      </InfoLayout>
    </>
  );
};

export default TermsAndConditions;
