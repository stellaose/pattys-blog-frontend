// ! OPTIONS (categories mirror the blog model enum on the server)
export const blogCategories = [
  "News",
  "Politics",
  "Entertainment",
  "Sports",
  "Business",
  "Education",
  "Other",
];

export const feedCategories = ["All", ...blogCategories];

export const blogCategoryOptions = blogCategories.map((category) => ({
  label: category,
  value: category,
}));

export const feedSortOptions = [
  { label: "Latest", value: "-createdAt" },
  { label: "Most liked", value: "-likeNo" },
];

export const feedPageSize = 10;

// # HELPERS
export const formatBlogDate = (date: string | undefined) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getAuthorName = (authorDetails: any) => {
  const name =
    `${authorDetails?.first_name ?? ""} ${authorDetails?.last_name ?? ""}`.trim();
  return name || "Pattys member";
};

export const getNextLikeStatus = (
  blog: any,
  userId: string,
  clicked: "like" | "dislike",
) => {
  const current = clicked === "like" ? blog?.likes : blog?.dislikes;
  return current?.includes(userId) ? "none" : clicked;
};

export const getUserProfileLink = (authorId: string | undefined) =>
  authorId ? `/users/${authorId}` : "#";

export const canDeleteReview = (blog: any, review: any, userId: string) =>
  !!userId && (review?.author === userId || blog?.author === userId);

export const getBlogExcerpt = (
  description: string[] | string | undefined,
  length = 220,
) => {
  const text = Array.isArray(description)
    ? description.join(" ")
    : (description ?? "");
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
};
