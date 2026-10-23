export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

export const legalLastUpdated = "13 October 2026";

// ? TERMS AND CONDITIONS
export const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Accepting these terms",
    paragraphs: [
      "Pattys is a community for reading, writing and discussing blogs. By creating an account or using the platform you agree to these terms. If you do not agree with them, please do not use Pattys.",
    ],
  },
  {
    id: "account",
    title: "Your account",
    paragraphs: [
      "You need an account to publish blogs, like, dislike and comment. You are responsible for the activity on your account and for keeping your password private.",
    ],
    points: [
      "Give accurate information when you sign up and keep it up to date.",
      "Verify your e-mail address with the code we send you.",
      "Do not share your account or use someone else's account.",
      "Tell us straight away if you think your account has been accessed without your permission.",
    ],
  },
  {
    id: "content",
    title: "What you publish",
    paragraphs: [
      "You own the blogs and comments you publish on Pattys. By publishing them you give us permission to store, display and share them on the platform so that other members can read and respond to them.",
      "You are responsible for what you publish. Only publish content that you wrote or have the right to share.",
    ],
  },
  {
    id: "conduct",
    title: "Community rules",
    paragraphs: [
      "Pattys works when people feel safe to share ideas. You agree not to use the platform to:",
    ],
    points: [
      "Harass, threaten or abuse other members.",
      "Publish content that is hateful, unlawful, misleading or that infringes someone else's rights.",
      "Send spam or manipulate likes, dislikes or comments.",
      "Attempt to access accounts or data that are not yours, or disrupt the platform.",
    ],
  },
  {
    id: "moderation",
    title: "Moderation and flagged content",
    paragraphs: [
      "Blogs that break these rules may be flagged and hidden from the community. Blog authors can remove comments on their own blogs, and members can remove their own comments. We may suspend or close accounts that repeatedly or seriously break these terms.",
    ],
  },
  {
    id: "availability",
    title: "Availability of the service",
    paragraphs: [
      "We work to keep Pattys available, but the platform is provided as it is and we cannot promise that it will always be available or free of errors. Features may change, be added or be removed over time.",
    ],
  },
  {
    id: "leaving",
    title: "Leaving Pattys",
    paragraphs: [
      "You can stop using Pattys at any time and delete the blogs and comments you have published. Contact us if you would like your account closed.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: [
      "We may update these terms as Pattys grows. When we make a significant change we will update the date at the top of this page. Continuing to use Pattys after a change means you accept the updated terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "If you have a question about these terms, reach us through the Contact us page.",
    ],
  },
];

// & PRIVACY POLICY
export const privacySections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      "This policy explains what information Pattys collects, why we collect it and the choices you have. We collect only what we need to run the platform.",
    ],
  },
  {
    id: "information",
    title: "Information we collect",
    paragraphs: ["When you create an account and use Pattys we collect:"],
    points: [
      "Account details: first name, last name, username, e-mail address, phone number, gender and, if you add one, your bio.",
      "Your password, which is stored in protected form and never shown to anyone.",
      "Content you create: the blogs you publish and the comments you write.",
      "Activity: the blogs you like or dislike.",
    ],
  },
  {
    id: "use",
    title: "How we use it",
    paragraphs: ["We use your information to:"],
    points: [
      "Create and secure your account, including sending verification and password reset codes to your e-mail.",
      "Show your blogs, comments and name to other members.",
      "Keep the community safe, for example by reviewing flagged content.",
      "Understand how Pattys is used so that we can improve it.",
    ],
  },
  {
    id: "visibility",
    title: "What other members can see",
    paragraphs: [
      "Your first name, last name and username appear next to the blogs and comments you publish. Your e-mail address, phone number and password are never shown to other members.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing your information",
    paragraphs: [
      "We do not sell your personal information. We share it only with the service providers that help us run Pattys, such as hosting and e-mail delivery, and when the law requires us to.",
    ],
  },
  {
    id: "storage",
    title: "How long we keep it",
    paragraphs: [
      "We keep your information for as long as your account is open. Blogs and comments you delete are removed from the platform. A sign-in token is kept in your browser while you are logged in and is cleared when you log out.",
    ],
  },
  {
    id: "choices",
    title: "Your choices",
    paragraphs: ["You are in control of your information. You can:"],
    points: [
      "View and edit your personal details from your profile settings.",
      "Change your password at any time.",
      "Delete your own blogs and comments.",
      "Ask us to close your account and remove your information.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "If we change how we handle your information we will update this page and the date at the top.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "If you have a question about your privacy on Pattys, reach us through the Contact us page.",
    ],
  },
];

// $ ABOUT US
export const aboutStory = [
  "Pattys started with a simple belief: good ideas deserve a calm place to be read and a kind place to be discussed.",
  "It is a community blog where anyone can publish what they are thinking about, find writing in the categories they care about, and respond with a like or a comment.",
];

export const aboutSteps = [
  {
    title: "Create your account",
    text: "Sign up, verify your e-mail and set up your profile in a couple of minutes.",
  },
  {
    title: "Read what moves you",
    text: "Search the feed or browse by category, from news and business to sports and education.",
  },
  {
    title: "Join the conversation",
    text: "Like the blogs you enjoy and add your thoughts in the comments.",
  },
  {
    title: "Share your voice",
    text: "Publish your own blog and see how the community responds.",
  },
];

// # CONTACT US
export const contactTopics = [
  { label: "General question", value: "General question" },
  { label: "Report a blog or comment", value: "Report a blog or comment" },
  { label: "Problem with my account", value: "Problem with my account" },
  { label: "Feedback", value: "Feedback" },
];
