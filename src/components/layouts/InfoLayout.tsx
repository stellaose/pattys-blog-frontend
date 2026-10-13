"use client";
import React from "react";
import { AppLayouts } from "./AppLayouts";
import { container, eyebrow } from "#/styles/home";
import {
  infoBody,
  infoDescription,
  infoGlow,
  infoHeader,
  infoTitle,
  infoUpdated,
} from "#/styles/info";

export const InfoLayout: React.FC<{
  children: React.ReactNode;
  label: string;
  title: string;
  description: string;
  lastUpdated?: string;
}> = ({ children, label, title, description, lastUpdated }) => {
  return (
    <>
      <AppLayouts>
        <div className={infoBody}>
          <div className={container}>
            <div className={infoHeader}>
              <div className={infoGlow} />
              <p className={`${eyebrow} relative`}>{label}</p>
              <h1 className={infoTitle}>
                {title}
                <span className="text-purple-200">.</span>
              </h1>
              <p className={infoDescription}>{description}</p>
              {lastUpdated && (
                <p className={infoUpdated}>Last updated: {lastUpdated}</p>
              )}
            </div>

            {children}
          </div>
        </div>
      </AppLayouts>
    </>
  );
};
