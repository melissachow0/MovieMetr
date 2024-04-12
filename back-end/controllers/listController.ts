import List from "../models/lists";
import User from "../models/user";
import Movie from "../models/movies";
import Tvshow from "../models/TVshows";
import { addMovie } from "./movieController";

//adds a new list to the database, takes a list name and user id
const addList = async (name: string, userId: string) => {
  try {

    //check if user exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      console.error("Error adding list: User not found");
      return null;
    }
    const newList = new List({
      name: name,
      user_id: userId,
    });
    await newList.save();
    return newList;
    } catch (error) {
    console.error("Error adding list", error);
    return null;
    }
}

//deletes a list from the database by its id
const deleteList = async (listId: string) => {
  try {
    await List.deleteOne({ _id: listId });
    return true;
    } catch (error) {
    console.error("Error deleting list", error);
    return false;
    }
}

//adds a movie to a list by its id
const addMovieToList = async (listId: string, movieId: string) => {
  try {
    //grab list from db
    const list = await List.findOne({ _id: listId });
    //check if list exists
    if (!list) {
      console.error("Error adding movie to list: List not found");
      return null;
    }
    //check if movie exists
    const movie = await Movie.findOne ({ _id: movieId });
    if (!movie){
        //add movie to db
       addMovie(movieId);
    }
    //check if movie is already in list
    if(list.entries.some((entry: any) => entry.item_id === movieId)){
      console.error("Error adding movie to list: Movie already in list");
      return null;
    }
    //create new entry object
    const newEntry = {
      itemType: 'Movie',
      item_id: movieId,
    };
    //add entry to list
    list.entries.push(newEntry);
    await list.save();
    return list;
    } catch (error) {
    console.error("Error adding movie to list", error);
    return null;
    }
}

//get all lists for a userId
const getUserLists = async (userId: string) => {
  try {
    //check if user exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      console.error("Error getting lists: User not found");
      return null;
    }
    const lists = await List.find({ user_id: userId });
    return lists;
    } catch (error) {
      console.error("Error getting lists", error);
      return null;
    }
}

//gets a list by its id
const getList = async (listId: string) => {
  try {
    const list = await List.findOne({ _id: listId });
    return list;
    } catch (error) {
    console.error("Error getting list", error);
    return null;
    }
}

export { addList, deleteList, addMovieToList, getUserLists, getList};

