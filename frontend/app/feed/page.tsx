"use client";
import React from "react";
import { Box, Stack, Avatar, Typography } from "@mui/material";
import { Posts } from "@/_api/mockdata";
import "./feed.css";

// Define the Post interface inside BasicStack.tsx
interface Post {
  id: number;
  avatar: string;
  username: string;
  handle: string;
  content: string;
}

const BasicStack: React.FC = () => {
  return (
    <Box className="feed-container">
      <Typography variant="h4" className="feed-title">
        USER FEED
      </Typography>
      <div className="feed-scrollable">
        <Stack spacing={2}>
          {Posts.map((post: Post) => (
            <div key={post.id} className="feed-item">
              <Avatar
                src={post.avatar}
                alt={post.username}
                className="feed-avatar"
              />
              <div className="feed-content">
                <Typography className="feed-username">
                  {post.username}{" "}
                  <span className="feed-handle">{post.handle}</span>
                </Typography>
                <Typography className="feed-text">{post.content}</Typography>
              </div>
            </div>
          ))}
        </Stack>
      </div>
    </Box>
  );
};

export default BasicStack;
