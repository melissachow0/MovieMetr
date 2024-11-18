"use client";
import React from "react";
import { Box, Stack, Avatar, Typography, TextField, Button } from "@mui/material";
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

interface UserProfilePreview{
  id: number;
  avatar: string;
  username: string;
  handle: string;
}

const BasicStack: React.FC = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [showSearchResults, setShowSearchResults] = React.useState(false); // Tracks whether to display search results
  const [filteredPosts, setFilteredPosts] = React.useState<Post[]>([]); // Stores filtered posts based on search input

  // Handle search input and show results
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      const results = Posts.filter((post) =>
        post.username.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredPosts(results);
      setShowSearchResults(true);
    }
  };


   // Go back to the feed
   const handleBackToFeed = () => {
    setShowSearchResults(false);
    setSearchInput(""); // Clear the search input
  };




  return (
    <Box className="feed-container">
      {!showSearchResults && (
        <div className="search-bar">
          <TextField
            label="Search Users"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </Button>
        </div>
      )}
      <Typography variant="h4" className="feed-title">
<<<<<<< HEAD
        USER FEED
=======
        {showSearchResults ? "Search Results" : "User Feed"}
>>>>>>> 6861f6140bc85a356f097ff76f0500953f67131c
      </Typography>
      {showSearchResults ? (
        // Search Results Screen
        <div className="feed-scrollable">
          <Button
            variant="outlined"
            onClick={handleBackToFeed}
            style={{ marginBottom: "16px" }}
          >
            Back to Feed
          </Button>
          <Stack spacing={2}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post: Post) => (
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
              ))
            ) : (
              <Typography>No results found for "{searchInput}"</Typography>
            )}
          </Stack>
        </div>
      ) : (
        
        // Main Feed Screen
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
      )}
    </Box>
  );
};

export default BasicStack;
