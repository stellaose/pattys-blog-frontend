import { useCallback } from "react";
import { usePostDataMutation } from "#/store";
import { useNotify } from "#/components/general";
import { endpoints } from "#/model/endpoints";

export type ContactMessage = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export const useContact = () => {
  const { Notify } = useNotify();

  const [postData, postResponse] = usePostDataMutation();

  const onSendContactMessage = useCallback(
    async (contact: ContactMessage) => {
      try {
        const response: any = await postData({
          postUrl: endpoints.contact.create,
          request: contact,
        });

        if (response && "data" in response) {
          Notify(response?.data?.message, true);
          return true;
        } else {
          Notify(response?.error?.data?.message, false);
        }
      } catch (error: any) {
        Notify(
          error?.message || "Something went wrong. Please try later",
          false,
        );
      }
    },
    [Notify, postData],
  );

  return { onSendContactMessage, postResponse };
};
