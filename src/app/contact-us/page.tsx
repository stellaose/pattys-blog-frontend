"use client";
import React from "react";
import { InfoLayout } from "#components/layouts";
import { ContactContent } from "#components/elements";
import { useAppSelector } from "#store/hook";
import { useContact } from "#/hooks";

const ContactUs = () => {
  const user = useAppSelector((state) => state.app.user);

  const { onSendContactMessage, postResponse } = useContact();

  return (
    <>
      <InfoLayout
        label="contact us"
        title="We would love to hear from you"
        description="Questions, feedback or something that needs our attention? Send us a message."
      >
        <ContactContent
          user={user}
          loading={postResponse.isLoading}
          onSubmit={onSendContactMessage}
        />
      </InfoLayout>
    </>
  );
};

export default ContactUs;
