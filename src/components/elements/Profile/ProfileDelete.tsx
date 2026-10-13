"use client";
import React, { useState } from "react";
import { Input, Modal } from "antd";
import { GoTrash } from "react-icons/go";
import { SubmitButton } from "#components/general";
import { createBlogTitle } from "#/styles/feed";
import { sectionText } from "#/styles/home";
import {
  profileDanger,
  profileDangerButton,
  profileDangerTitle,
} from "#/styles/profile";
import { deleteAccountPlaceholder } from "#/utils/placeholder";

type Props = {
  user: any;
  loading: boolean;
  onDelete: () => void;
};

export const ProfileDelete: React.FC<Props> = ({ user, loading, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const isConfirmed =
    !!user?.user_name && confirmation.trim() === user.user_name;

  const onClose = () => {
    setOpen(false);
    setConfirmation("");
  };

  return (
    <>
      <div className={profileDanger}>
        <div>
          <p className={profileDangerTitle}>delete account</p>
          <p className={`${sectionText} !text-sm max-w-[620px]`}>
            Permanently delete your account and every blog you have published.
            This cannot be undone.
          </p>
        </div>
        <button
          type="button"
          className={profileDangerButton}
          onClick={() => setOpen(true)}
        >
          <GoTrash size={16} /> Delete account
        </button>
      </div>

      <Modal
        open={open}
        footer={null}
        centered
        destroyOnHidden
        width={520}
        onCancel={onClose}
      >
        <div className="flex flex-col gap-y-4 pt-2">
          <div>
            <p className={profileDangerTitle}>this is permanent</p>
            <h3 className={createBlogTitle}>Delete your account?</h3>
            <p className={`${sectionText} !text-sm mt-1`}>
              Your profile and all your blogs will be removed and you will be
              logged out. To confirm, type your username{" "}
              <span className="font-bold text-black-200">
                {user?.user_name}
              </span>{" "}
              below.
            </p>
          </div>

          <Input
            value={confirmation}
            placeholder={deleteAccountPlaceholder}
            className="!h-12.5 text-base"
            onChange={(e) => setConfirmation(e.target.value)}
          />

          <div className="flex sm:flex-row flex-col gap-3">
            <SubmitButton
              title="Cancel"
              bgVariant="cancel"
              className="!w-full"
              onClick={onClose}
            />
            <SubmitButton
              title="Delete account"
              bgVariant="reject"
              className="!w-full disabled:!opacity-50"
              loading={loading}
              disabled={!isConfirmed}
              onClick={onDelete}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
