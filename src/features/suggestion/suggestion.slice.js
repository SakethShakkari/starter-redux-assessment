import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSuggestion = createAsyncThunk(
  /* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */

  "suggestion/fetchSuggestion",
  async () => {
    const response = await fetch("http://localhost:3004/api/suggestion");
    const jsonresponse = await response.json();
    return jsonresponse;
  }
);

const initialState = {
  suggestion: { data: { imageUrl: "", caption: "" } },
  loading: false,
  error: true,
};

const options = {
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.suggestion = action.payload;

        state.loading = false;
        state.error = false;
      })
      .addCase(fetchSuggestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
