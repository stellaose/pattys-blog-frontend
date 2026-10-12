import React, { ReactNode } from "react";
import { Logo, MailIcon } from "#assets/images";
import Image from "next/image";
import {
  layoutAuthBody,
  layoutAuth,
  otpForm,
  otpFormBody,
  otpFormDescription,
  otpFormTitle,
} from "#/styles/auth";
import { motion, useReducedMotion } from "framer-motion";

export const LayoutAuth: React.FC<{
  children: ReactNode;
  title?: string;
  description?: string[];
  icon?: ReactNode;
}> = ({
  children,
  title = "Check your inbox! ",
  description = [
    "We’ve sent a 6-digit verification code to your email",
    "Please enter it below to continue.",
  ],
  icon,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.26, 1, 0.4, 1] }}
      className={layoutAuthBody}
    >
      <Image src={Logo} alt="" loading="eager" className="h-[50px] w-auto" />
      <div className={layoutAuth}>
        <div className={otpForm}>
          <div className={otpFormBody}>
            {icon ?? (
              <Image
                src={MailIcon}
                alt=""
                loading="eager"
                className="h-[112px] w-auto"
              />
            )}
            <h2 className={otpFormTitle}>{title}</h2>
            <div className="flex flex-col gap-0.5 text-center">
              {description.map((text) => (
                <p key={text} className={otpFormDescription}>
                  {text}
                </p>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-12.75"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              delay: shouldReduceMotion ? 0 : 0.25,
              ease: [0.26, 1, 0.4, 1],
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
