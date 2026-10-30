/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";


const initialState = {
  name: "",
  email: "",
  photoURL: "",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({email, password, name, imageUrl}) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imageUrl,
    })
    return {
      email: data.user.email,
      name: data.user.displayName,
      photoURL: data.user.photoURL,
    };
  }
);

export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async ({ email, password }) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      return {
        email: data.user.email,
        name: data.user.displayName,
        photoURL: data.user.photoURL,
      };

    } catch (error) {
      throw error; // Propagate the error to the Redux state
    }
  }
);

export const socialLoginUser = createAsyncThunk(
  "userSlice/socialLoginUser",
  async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, googleProvider)
      return {
        email: data.user.email,
        name: data.user.displayName,
        photoURL: data.user.photoURL,
      };
    } catch (error) {
      throw error; // Propagate the error to the Redux state
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.photoURL = payload.photoURL;
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.photoURL = "";
    },
  },
  // to match multiple action types and apply the same logic using .addMatcher method
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type === createUser.pending.type ||
          action.type === loginUser.pending.type || 
          action.type === socialLoginUser.pending.type,
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.email = "";
          state.photoURL = "";
          state.name = "";
          state.error = "";
        }
      )
      .addMatcher(
        (action) =>
          action.type === createUser.fulfilled.type ||
          action.type === loginUser.fulfilled.type ||
          action.type === socialLoginUser.fulfilled.type,
        (state, { payload }) => {
          state.isLoading = false;
          state.isError = false;
          state.email = payload.email;
          state.name = payload.name;
          state.photoURL = payload.photoURL;
          state.error = "";
        }
      )
      .addMatcher(
        (action) =>
          action.type === createUser.rejected.type ||
          action.type === loginUser.rejected.type ||
          action.type === socialLoginUser.rejected.type,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.email = "";
          state.name = "";
          state.photoURL = "";
          state.error = action.error.message;
        }
      );
  }  
});

export const { setUser, toggleLoading, logout } = userSlice.actions;

export default userSlice.reducer;
