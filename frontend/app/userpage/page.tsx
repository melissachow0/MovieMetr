"use client";
import styles from "./userpage.module.css";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { Tabs, Tab, Box } from "@mui/material";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import profilePic from "../../public/_assets/sample_profile_pic.png"
import bannerPic from "../../public/_assets/sample_banner_pic.jpg"
import Review from "@/_ui/components/Review/Review";
import { mockUser, MovieLists } from "@/_api/mockdata";
import EditProfileModal from "@/_ui/components/EditProfile/EditProfile";
import {
  getUser,
  uploadProfilePicture,
  updateProfilePath,
} from "@/_api/editprofile";
import notfound from "@/_assets/NOTFOUND.png";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";

// interface for the user
interface User {
  _id: string;
  username: string;
  email: string;
  profilePath: string;
  bio: String;
}

// interface for the tabs
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

//interface for the movielist
interface MovieList {
  _id: string;
  name: string;
  description: string;
  entries: { itemType: string; item_id: string; imageUrl?: string }[];
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

// each tab has a name - component pair
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Userpage = () => {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState<User | null>(mockUser);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userLists, setUserLists] = useState<MovieList[]>(MovieLists);
  const [isCreateListFormVisible, setIsCreateListFormVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isListEditing, setIsListEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const openEditProfileModal = () => {
    setIsEditProfileOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileOpen(false);
  };

  const handleCreateListClick = () => {
    setIsCreateListFormVisible(true);
    setIsListEditing(false);
  };

  const handleCancelClick = () => {
    setIsCreateListFormVisible(false);
    setNewListName("");
  };


  const actions = [
    {
      icon: <AddIcon />,
      name: "Create List",
      onClick: handleCreateListClick,
    },
    {
      icon: <EditIcon />,
      name: "Edit List",
      onClick: () => {
        setIsListEditing(true);
      },
    },
    {
      icon: <CancelIcon />,
      name: "Cancel",
      onClick: () => {
        setIsListEditing(false);
      },
    },
  ];

  const fetchUser = async (userId: string) => {
    try {
      // Simulate API delay with setTimeout (optional)
      setTimeout(() => {
        setUser(mockUser);
      }, 500);
    } catch (error) {
      console.error("Error fetching mock user data", error);
    }
  };

  const refreshUserData = () => {
    setUser(mockUser);
    setUserLists([...MovieLists]);
  };

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };
  
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const addList = async (name: string, userId: string) => {
    const newList = {
      _id: (Math.random() * 1000).toFixed(0), // Generate a mock ID
      name,
      description: "",
      entries: [],
    };
    MovieLists.push(newList);
    return newList;
  };

  const deleteList = async (listId: string) => {
    const index = MovieLists.findIndex((list) => list._id === listId);
    if (index !== -1) {
      MovieLists.splice(index, 1);
    }
  };

  const handleCreateListSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (user) {
      const newList = await addList(newListName, user._id);
      setUserLists([...userLists, newList]);
    }
    setIsCreateListFormVisible(false);
    setNewListName("");
  };
  

  const handleDeleteListClick = async (listId: string) => {
    await deleteList(listId);
    refreshUserData();
  };

  //profile pic upload
  const handleProfilePicClick = () => {
    fileInputRef.current?.click();
  };

  const totalFilms = userLists.reduce(
    (total, list) => total + list.entries.length,
    0,
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        console.log("Uploading profile picture...");
        const response = await uploadProfilePicture(file);
        console.log("Profile picture uploaded successfully", response);
        // Assuming the response contains the new image URL
        const newImageUrl = response.imageUrl;
        console.log("New image URL:", newImageUrl);
        if (user) {
          // Update the user profile picture
          await updateProfilePath(user._id, newImageUrl);
          // Refresh user data to reflect changes
          refreshUserData();
        }
      } catch (error) {
        console.error("Error uploading profile picture", error);
      }
    }
  };

  return (
    
    <div className={styles.userPage}>
      <div className={styles.banner}>
        <Image
          src={bannerPic} // src={user?.bannerPic || defaultBannerPic}
          layout="fill"
          objectFit="cover"
          alt="Banner Pictrue"
        />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.photoUsername}>
          <Image
            priority
            src={profilePic}
            width={200}
            height={200}
            alt="Profile Picture"
            className={styles.profilePicture}
            onClick={handleProfilePicClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <h2 className={styles.usernameText}>{user?.username}</h2>
        </div>
        <div className={styles.overviewBio}>
          <div className={styles.overview}>
            <p>{totalFilms} films</p>
            <p>300 followers</p>
            <p>300 following</p>
          </div>
          <p className={styles.bio}>{user?.bio}</p>
          <div className={styles.extensions}>
            <button
              className={styles.editProfile}
              onClick={openEditProfileModal}
            >
              Edit Profile
            </button>
            <button className={styles.shareProfile} type="submit" style={{marginLeft : 10}}> 
              Share Profile
            </button>
            <button
              className={styles.shareProfile}
              style={{ marginLeft: 10 }}
              onClick={openReviewModal}
            >
              Create Review
            </button>
            
          </div>
          {isEditProfileOpen && (
            <EditProfileModal
              isOpen={isEditProfileOpen}
              onClose={closeEditProfileModal}
              userId={user?._id}
              user={user}
              refreshUserData={refreshUserData}
            />
          )}
        </div>
      </div>
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
            {...a11yProps(0)}
            sx={{
              color: value === 0 ? "white" : "white", // Set the text color based on the tab's selection
            }}
          />
          <Tab
            label="Watchlist"
            {...a11yProps(1)}
            sx={{
              color: value === 1 ? "white" : "white",
            }}
          />
          <Tab
            label="Ratings"
            {...a11yProps(2)}
            sx={{
              color: value === 2 ? "white" : "white",
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className={styles.movieLists}>
          <div className={styles.movieButtons}>
            <div>
              {!isEditProfileOpen && (
                <SpeedDial
                  ariaLabel="SpeedDial openIcon example"
                  direction="right"
                  icon={<SpeedDialIcon />}
                  className={styles.SpeedDial}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={action.onClick}
                    />
                  ))}
                </SpeedDial>
              )}
              {isListEditing && <p>Editing List...</p>}
            </div>
            {isCreateListFormVisible && (
              <form
                className={styles.addMovieListForm}
                onSubmit={handleCreateListSubmit}
              >
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
                <button type="submit">Create</button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </form>
            )}
          </div>
          {userLists.map((list) => (
            <div key={list._id} className={styles.listContainer}>
              <div className={styles.scrollContainer}>
                {isListEditing && (
                  <div className={styles.listOverlay}>
                    <button onClick={() => handleDeleteListClick(list._id)}>
                      Delete
                    </button>
                  </div>
                )}
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
                        //`/_assets/films/popularfilms/${entry.imageUrl}`
                      />
                    ) : (
                      entry.item_id
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.listInfo}>
                <div className={styles.listName}>
                  <Link href={`/movielist/${list._id}`}>
                    <h2>{list.name}</h2>
                  </Link>
                </div>
                <div className={styles.listDescription}>
                  <p>{list.entries.length} movies</p>
                  <p>
                    {list.description
                      ? list.description.substring(0, 100)
                      : "No description yet"}
                    ...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      {isReviewModalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <button
                  className={styles.closeButton}
                  onClick={closeReviewModal}
                >
                  ×
                </button>
                <Review />
              </div>
            </div>
          )}
      </CustomTabPanel>
    </div>
  );
};

export default Userpage;
