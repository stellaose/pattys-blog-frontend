import React from "react";
import { feedPanelTitle } from "#/styles/feed";
import {
  infoPanel,
  legalGrid,
  legalHeading,
  legalList,
  legalNav,
  legalNavLink,
  legalSection,
  legalText,
} from "#/styles/info";
import { LegalSection } from "#/utils/info";

export const LegalContent: React.FC<{ sections: LegalSection[] }> = ({
  sections,
}) => {
  return (
    <div className={legalGrid}>
      <nav className={legalNav}>
        <p className={`${feedPanelTitle} !mb-1`}>on this page</p>
        {sections.map((section, index) => (
          <a key={section.id} href={`#${section.id}`}>
            <span className={legalNavLink}>
              {index + 1}. {section.title}
            </span>
          </a>
        ))}
      </nav>

      <div className={infoPanel}>
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className={legalSection}>
            <h2 className={legalHeading}>
              {index + 1}. {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={legalText}>
                {paragraph}
              </p>
            ))}
            {section.points && (
              <ul className={legalList}>
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};
