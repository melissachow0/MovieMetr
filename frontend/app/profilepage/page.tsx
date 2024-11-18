"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Tabs, Tab, Box, Button, Typography } from "@mui/material";
import profilePic from "../../public/_assets/sample_profile_pic.png";
import bannerPic from "../../public/_assets/sample_banner_pic.jpg";
import { mockProfiles, MovieLists } from "@/_api/mockdata";
import styles from "../userpage/userpage.module.css"; // Reuse the same CSS file for consistency

// Interface for Movie List
interface MovieList {
  _id: string;
  name: string;
  description: string;
  entries: { itemType: string; item_id: string; imageUrl?: string }[];
}

// Static Profile Page Component
const StaticProfilePage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  // Use the first mock profile as the default user
  const user = mockProfiles[0];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className={styles.userPage}>
      {/* Banner Section */}
      <div className={styles.banner}>
        <Image
          src={bannerPic}
          layout="fill"
          objectFit="cover"
          alt="Banner Picture"
        />
      </div>

      {/* User Info Section */}
      <div className={styles.userInfo}>
        <div className={styles.photoUsername}>
          <Image
            priority
            src={user?.avatar || profilePic}
            width={200}
            height={200}
            alt="Profile Picture"
            className={styles.profilePicture}
          />
          <h2 className={styles.usernameText}>{user?.username}</h2>
        </div>
        <div className={styles.overviewBio}>
          <div className={styles.overview}>
            <p>{MovieLists.length} movie lists</p>
            <p>300 followers</p>
            <p>300 following</p>
          </div>
          <p className={styles.bio}>{user?.bio}</p>

          {/* Follow Button */}
          <div className={styles.extensions}>
            <Button
              variant={isFollowing ? "contained" : "outlined"}
              color="primary"
              onClick={handleFollowClick}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "white" } }}
          sx={{ borderBottom: 0.5, borderColor: "white" }}
        >
          <Tab
            label="Movie Lists"
            sx={{
              color: value === 0 ? "white" : "white",
            }}
          />
          <Tab
            label="Watchlist"
            sx={{
              color: value === 1 ? "white" : "white",
            }}
          />
          <Tab
            label="Ratings"
            sx={{
              color: value === 2 ? "white" : "white",
            }}
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box>
        {value === 0 && (
          <div className={styles.movieLists}>
            {MovieLists.map((list) => (
              <div key={list._id} className={styles.listContainer}>
                <div className={styles.scrollContainer}>
                  {list.entries.map((entry, index) => (
                    <div key={index} className={styles.imageItem}>
                      {entry.imageUrl ? (
                        <Image
                          width={200}
                          height={200}
                          src={entry.imageUrl}
                          alt={entry.item_id}
                          style={{
                            width: "75%",
                            height: "75%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        entry.item_id
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.listInfo}>
                  <div className={styles.listName}>
                    <Typography variant="h6">{list.name}</Typography>
                  </div>
                  <div className={styles.listDescription}>
                    <Typography>
                      {list.entries.length} movies
                    </Typography>
                    <Typography>
                      {list.description || "No description available"}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {value === 1 && (
          <Typography className={styles.tabContent}>
            Watchlist is under construction.
          </Typography>
        )}
        {value === 2 && (
          <Typography className={styles.tabContent}>
            Ratings will be added soon.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default StaticProfilePage;