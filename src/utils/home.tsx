import { StaticImageData } from "next/image";
import { LoginImg, SignupImg } from "#assets/images";
import { Connect, Contribute, Discover } from "#assets/svg";

export type StoryTone = "lilac" | "pink" | "blue" | "cream";

export type Story = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  image?: StaticImageData;
  tone: StoryTone;
};

export const featuredStory: Story = {
  id: "the-quiet-power-of-writing-things-down",
  title: "The quiet power of writing things down",
  excerpt:
    "A notebook, a cup of coffee and twenty unhurried minutes. Why putting a thought on paper is still the fastest way to understand it.",
  category: "Writing",
  author: "Amara Obi",
  date: "Oct 8, 2026",
  readTime: "6 min read",
  likes: 248,
  comments: 36,
  image: LoginImg,
  tone: "cream",
};

export const stories: Story[] = [
  {
    id: "what-a-year-of-reading-slowly-taught-me",
    title: "What a year of reading slowly taught me",
    excerpt: "Twelve books instead of fifty, and I remember every one of them.",
    category: "Books",
    author: "Tolu Adeyemi",
    date: "Oct 6, 2026",
    readTime: "5 min read",
    likes: 182,
    comments: 24,
    image: SignupImg,
    tone: "blue",
  },
  {
    id: "small-communities-big-conversations",
    title: "Small communities, big conversations",
    excerpt:
      "The best discussions online rarely happen where the crowd is loudest.",
    category: "Community",
    author: "Chidi Nwosu",
    date: "Oct 3, 2026",
    readTime: "4 min read",
    likes: 96,
    comments: 41,
    tone: "lilac",
  },
  {
    id: "designing-a-morning-you-look-forward-to",
    title: "Designing a morning you look forward to",
    excerpt:
      "Forget the 5am club. Start with one thing you would miss if it was gone.",
    category: "Lifestyle",
    author: "Zainab Bello",
    date: "Sep 29, 2026",
    readTime: "7 min read",
    likes: 134,
    comments: 18,
    tone: "pink",
  },
  {
    id: "the-tools-we-use-shape-the-ideas-we-have",
    title: "The tools we use shape the ideas we have",
    excerpt: "On choosing software the way you would choose a place to think.",
    category: "Technology",
    author: "Emeka Eze",
    date: "Sep 24, 2026",
    readTime: "8 min read",
    likes: 77,
    comments: 12,
    tone: "blue",
  },
  {
    id: "notes-on-finding-your-voice",
    title: "Notes on finding your voice",
    excerpt:
      "You do not find it by waiting. You find it by publishing the awkward first drafts.",
    category: "Writing",
    author: "Amara Obi",
    date: "Sep 20, 2026",
    readTime: "5 min read",
    likes: 159,
    comments: 29,
    tone: "cream",
  },
  {
    id: "why-we-still-gather-around-stories",
    title: "Why we still gather around stories",
    excerpt:
      "From the fireside to the group chat, the instinct has not changed.",
    category: "Culture",
    author: "Ife Okafor",
    date: "Sep 15, 2026",
    readTime: "6 min read",
    likes: 121,
    comments: 33,
    tone: "lilac",
  },
];

export const storyCategories = [
  { name: "All", count: stories.length },
  ...Array.from(new Set(stories.map((story) => story.category))).map(
    (name) => ({
      name,
      count: stories.filter((story) => story.category === name).length,
    }),
  ),
];

export const highlights = [
  {
    icon: Discover,
    title: "Discover",
    text: "Curated stories that inspire, picked by people rather than an algorithm.",
  },
  {
    icon: Connect,
    title: "Connect",
    text: "Like, comment and join conversations with readers who care about the same things.",
  },
  {
    icon: Contribute,
    title: "Contribute",
    text: "Share your voice with the world. Your first story is a few clicks away.",
  },
];

export const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Latest stories", href: "/#stories" },
      { label: "Write a story", href: "/profile/my-blogs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Contact us", href: "/contact-us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & conditions", href: "/terms-and-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];
