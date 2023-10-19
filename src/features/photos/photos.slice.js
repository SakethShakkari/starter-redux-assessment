import { createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "../search/search.slice";
import photos from "./photos.data.js";

const initialState = {
  photos,
};

const options = {
  name: "photos",
  initialState,
  // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos.
  // Task 1 Hint: You can use state.photos.unshift()
  // `unshift()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
  reducers: {
    addPhoto: (state, action) => {
      state.photos.unshift({
        id: state.photos.length + 1,
        caption: action.payload.caption,
        imageUrl: action.payload.imageUrl,
      });
    },
    // Task 6: Create an `removePhoto()` case reducer that removes a photo from state.photos
    // Task 6 Hint: You can use state.photos.splice()
    // `splice()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    removePhoto: (state,action) => {
      const photoIDToRemove = action.payload;
      const stateIdtoRemove = state.photos.findIndex((photo)=>photo.id===photoIDToRemove);
      if (stateIdtoRemove !== -1) {
        // Use splice to remove the photo at the found index
        state.photos.splice(stateIdtoRemove, 1);
      }
    }
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  // Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
  //return state.photos.photos.filter((photo)=> photo.caption.toLowerCase().includes(selectSearchTerm.toLowerCase()));
  if(!state.search.searchTerm)
  return state.photos.photos;
  else
  return state.photos.photos.filter((photo)=> photo.caption.toLowerCase().includes(state.search.searchTerm.toLowerCase()));
};
