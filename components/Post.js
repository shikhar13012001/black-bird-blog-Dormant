import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Storage } from "aws-amplify";
import Link from "next/link";
import { userDetailByUsername } from "../src/graphql/queries";
import { readingTime } from "reading-time-estimator";
import { API } from "aws-amplify";
const Post = ({ post, styles }) => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  React.useEffect(async () => {
    //fetch userAttributes from API

    const userDetails = await API.graphql({
      query: userDetailByUsername,
      variables: {
        username: post.username,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    const userImage =
      userDetails.data.UserDetailByUsername.items[0]?.profileImage;
    if (userImage) {
      const userImageKey = await Storage.get(userImage);
      console.log(userImageKey);
      setImage(userImageKey);
    }
  }, [post.userImage]);
  //get cover image from post

  console.log(post);
  return (
    <Link href={`/posts/${post.id}`}>
      <div
        style={{ width: "350px", height: "fit-content" }}
        className="rounded overflow-hidden    hover:shadow-lg cursor-pointer"
      >
        <>
          <img
            className="w-full"
            src={
              post.coverImage ||
              "https://cdn.dribbble.com/users/1819010/screenshots/14873066/media/2e28b2261b91e84ad7068390e0bc40a7.png?compress=1&resize=1200x900&vertical=top"
            }
            alt="Sunset in the mountains"
            style={{
              height: "200px",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{post.title}</div>
            <div className="flex justify-between">
              <Link href={`/users/${post.username}`}>
                <p className="text-sm font-light my-4 flex items-center hover:text-blue-600">
                  by {post.username}
                  <img
                    src={
                      image ||
                      `https://avatars.dicebear.com/api/initials/${post.username}.svg`
                    }
                    alt="user"
                    className="w-8 h-8 rounded-full mr-2 ml-2"
                    onError={(e) => {
                      e.target.src = `https://avatars.dicebear.com/api/initials/${post.username}.svg`;
                    }}
                  />
                </p>
              </Link>
              <p className="text-sm font-light my-4 text-gray-300">
                {" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ mb: 3 }}
            >
              {readingTime(post.content).text}
            </Typography>
            <p className="text-gray-700 text-base">
              {post?.description?.substring(
                0,
                Math.min(post.description.length, 200)
              ) ||
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.".substring(
                  0,
                  200
                )}
              ...
              <span
                className="text-blue-500 text-sm cursor-pointer"
                onClick={() => router.push(`/posts/${post.id}`)}
              >
                Read More
              </span>
            </p>
          </div>
        </>
        <div className="px-6 pt-4 pb-1">
          {post?.postTags?.map((tag, key) => (
            <Link href={`/tags/${tag}`} key={key}>
              <span
                key={key}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-light text-gray-700 mr-2 mb-2"
              >
                #{tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Post;
