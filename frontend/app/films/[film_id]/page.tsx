"use client";

import { useEffect, useState } from "react";
import { mockplayingData } from "@/_api/mockdata"; // Import mock data
import MovieDetailPage from "@/_ui/components/MovieDetailPage/MovieDetailPage";
import { MovieData } from "@/_api/types";
import { getUserLists } from "@/_api/lists";
import { getUser } from "@/_api/editprofile";
import { getProfileFromToken } from "@/_api/profile";

export default function FilmDetailPage({
  params,
}: {
  params: { film_id: string };
}) {
  interface User {
    _id: string;
    username: string;
    email: string;
    profilePath: string;
    bio: String;
  }

  interface MovieList {
    _id: string;
    name: string;
    description: string;
    entries: { itemType: string; item_id: string; imageUrl?: string }[];
  }

  const [userLists, setUserLists] = useState<MovieList[]>([]); 
  const [user, setUser] = useState<User | null>(null);
  const tokenData = localStorage.getItem("token");

  const fetchUser = async (userId: string) => {
    try {
      const data = await getUser(userId);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const fetchUserListsData = async (userId: string) => {
    try {
      const lists = await getUserLists(userId);
      setUserLists(lists);
    } catch (error) {
      console.error("Error fetching user lists", error);
    }
  };

  const [filmData, setFilmData] = useState<{
    data: MovieData | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (tokenData) {
      const tokenObject = JSON.parse(tokenData);
      getProfileFromToken(tokenObject.value.token)
        .then((response) => {
          console.log("UserId in the movie page : " + response.user.id); 
          fetchUser(response.user.id); 
          fetchUserListsData(response.user.id);
        })
        .catch((error) => {
          console.error("Error fetching user ID: ", error);
        });
    }

    // Use mock data instead of API call
    const fetchData = () => {
      const movie = mockplayingData.find((movie) => movie.id === parseInt(params.film_id));
      if (movie) {
        const movieData: MovieData = {
          id: String(movie.id),
          backdrop_path: movie.backdrop_path,
          poster_path: movie.image,
          title: movie.title,
          release_date: "2024-07-26", // You can adjust this as per your mock data
          runtime: 120, // Default runtime or mock value
          genres: [], // Mock genres, or add if needed
          tagline: "Mock Tagline", // You can adjust this as per your mock data
          overview: movie.summary,
          credits: {
            cast: [], // Mock cast, or add if needed
          },
        };
        setFilmData({ data: movieData, loading: false, error: null });
      } else {
        setFilmData({ data: null, loading: false, error: "Movie not found" });
      }
    };

    fetchData();
  }, [params.film_id, tokenData]);

  if (filmData.loading) {
    return <div>Loading...</div>;
  }

  if (filmData.error) {
    return <div>Error: {filmData.error}</div>;
  }

  return (
    <div>
      <MovieDetailPage data={filmData.data} userId={user ? user._id : ""} />
    </div>
  );
}
