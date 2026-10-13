import React from "react";
import { GoBook, GoComment, GoGear, GoHeart, GoPulse } from "react-icons/go";

import { getAuthorName } from "./feed";

// ! TABS
export const profileTabs = [
  { label: "My blogs", href: "/profile/my-blogs", icon: <GoBook size={18} /> },
  { label: "Likes", href: "/profile/likes", icon: <GoHeart size={18} /> },
  {
    label: "Comments",
    href: "/profile/comments",
    icon: <GoComment size={18} />,
  },
  {
    label: "Activity",
    href: "/profile/activities",
    icon: <GoPulse size={18} />,
  },
  { label: "Settings", href: "/profile/settings", icon: <GoGear size={18} /> },
];

// # HELPERS
export type ProfileComment = {
  reviewId: string;
  review: string;
  author: string;
  authorName: string;
  blogId: string;
  blogTitle: string;
};

export type ProfileActivity = {
  id: string;
  type: "blog" | "like" | "dislike" | "comment";
  text: string;
  detail: string;
  date?: string;
};

export const getProfileStats = (blogs: any[]) => ({
  blogs: blogs.length,
  likes: blogs.reduce((total, blog) => total + (blog?.likeNo ?? 0), 0),
  comments: blogs.reduce(
    (total, blog) => total + (blog?.review?.length ?? 0),
    0,
  ),
});

export const getLikedBlogs = (allBlogs: any[], userId: string) =>
  allBlogs.filter((blog) => blog?.likes?.includes(userId));

export const getBlogComments = (blogs: any[]): ProfileComment[] =>
  blogs.flatMap((blog) =>
    (blog?.review ?? []).map((review: any) => ({
      reviewId: review.reviewId,
      review: review.review,
      author: review.author,
      authorName: getAuthorName(review.authorDetails),
      blogId: blog.blogId,
      blogTitle: blog.title,
    })),
  );

export const getReceivedComments = (myBlogs: any[], userId: string) =>
  getBlogComments(myBlogs).filter((comment) => comment.author !== userId);

export const getWrittenComments = (allBlogs: any[], userId: string) =>
  getBlogComments(allBlogs).filter((comment) => comment.author === userId);

export const getActivities = (
  myBlogs: any[],
  allBlogs: any[],
  userId: string,
): ProfileActivity[] => {
  const published: ProfileActivity[] = myBlogs.map((blog) => ({
    id: `blog-${blog.blogId}`,
    type: "blog",
    text: "You published a blog",
    detail: blog.title,
    date: blog.createdAt,
  }));

  const liked: ProfileActivity[] = allBlogs
    .filter((blog) => blog?.likes?.includes(userId))
    .map((blog) => ({
      id: `like-${blog.blogId}`,
      type: "like",
      text: "You liked a blog",
      detail: blog.title,
    }));

  const disliked: ProfileActivity[] = allBlogs
    .filter((blog) => blog?.dislikes?.includes(userId))
    .map((blog) => ({
      id: `dislike-${blog.blogId}`,
      type: "dislike",
      text: "You disliked a blog",
      detail: blog.title,
    }));

  const commented: ProfileActivity[] = getWrittenComments(allBlogs, userId).map(
    (comment) => ({
      id: `comment-${comment.reviewId}`,
      type: "comment",
      text: `You commented on "${comment.blogTitle}"`,
      detail: comment.review,
    }),
  );

  return [
    ...published.sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
    ),
    ...commented,
    ...liked,
    ...disliked,
  ];
};
