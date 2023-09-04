import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    albums: []
}

// Create an async thunk for fetching initial data
export const getInitialStateAsync = createAsyncThunk(
    'albums/getInitialState',
    async () => {
        // Make an API GET request to fetch initial data
        return await axios.get("https://jsonplaceholder.typicode.com/albums");
    }
)

// Create an async thunk for adding a new album
export const addAlbumAsync = createAsyncThunk(
    'albums/addAlbum',
    async (albumData) => {
        // Make an API POST request to add a new album
        return await axios.post("https://jsonplaceholder.typicode.com/albums", albumData);
    }
);

// Create an async thunk for updating an album
export const updateAlbumAsync = createAsyncThunk(
    'albums/updateAlbum',
    async ({ id, userId, updatedAlbumData }) => {
        // Make an API PUT request to update an album
        return await axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, updatedAlbumData);
    }
);

// Create an async thunk for deleting an album
export const deleteAlbumAsync = createAsyncThunk(
    'albums/deleteAlbum',
    async (albumId) => {
        // Make an API DELETE request to delete an album
        await axios.delete(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
        return albumId;
    }
);

// Creating a Redux Slice using Redux Toolkit
const albumSlice = createSlice({
    name: 'album',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInitialStateAsync.fulfilled, (state, action) => {
            // When fetching initial data is successful, update the state with the fetched data
            state.albums = [...action.payload.data];
        })
        .addCase(addAlbumAsync.fulfilled, (state, action) => {
            // When adding a new album is successful, add it to the state
            state.albums.push(action.payload.data);
        })
        .addCase(updateAlbumAsync.fulfilled, (state, action) => {
            // When updating an album is successful, find and replace the album in the state
            const updatedAlbum = action.payload.data;
            const index = state.albums.findIndex(album => album.id === updatedAlbum.id);
            if (index !== -1) {
                state.albums[index] = updatedAlbum;
            }
        })
        .addCase(deleteAlbumAsync.fulfilled, (state, action) => {
            // When deleting an album is successful, remove it from the state
            const deletedAlbumId = action.payload;
            state.albums = state.albums.filter(album => album.id !== deletedAlbumId);
        });
    }
});

export const albumReducer = albumSlice.reducer;
export const actions = albumSlice.actions;

// Selector to access the album data in the state
export const albumSelector = (state) => state.albumReducer.albums;
