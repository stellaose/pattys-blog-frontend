"use client";
import React from "react";
import { InfoLayout } from "#components/layouts";
import { ContactContent } from "#components/elements";
import { useAppSelector } from "#store/hook";

const ContactUs = () => {
  const user = useAppSelector((state) => state.app.user);

  return (
    <>
      <InfoLayout
        label="contact us"
        title="We would love to hear from you"
        description="Questions, feedback or something that needs our attention? Send us a message."
      >
        <ContactContent user={user} />
      </InfoLayout>
    </>
  );
};

export default ContactUs;
