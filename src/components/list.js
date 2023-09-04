import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  albumSelector,
  getInitialStateAsync,
  updateAlbumAsync,
  deleteAlbumAsync,
} from "../reducer/albumReducer";
import styles from "../styles/list.module.css";

function AlbumList() {
  const albums = useSelector(albumSelector);
  const dispatch = useDispatch();
  const [editingTitle, setEditingTitle] = useState(""); // State to track which title is being edited
  const [updatedTitle, setUpdatedTitle] = useState(""); // State to store the updated title

  useEffect(() => {
    dispatch(getInitialStateAsync());
  }, []);

  // Function to handle updating the title
  const handleUpdateTitle = (id, userId) => {
    if (updatedTitle) {
      // If an updated title exists, dispatch the update
      dispatch(updateAlbumAsync({ id, updatedAlbumData: { title: updatedTitle, userId } }));
      setUpdatedTitle(""); // Clear the updated title state after update
      setEditingTitle(""); // Clear the editing state
    }
  };

  return (
    <div>
      <table className={styles.container}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>{album.id}</td>
              <td>{album.userId}</td>
              <td>
                {album.id === editingTitle ? ( // Render input field for editing title
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                ) : (
                  album.title
                )}
              </td>
              <td>
                {album.id === editingTitle ? ( // Show "SAVE" button when editing
                  <button
                    className={styles.update}
                    onClick={() => handleUpdateTitle(album.id, album.userId)}
                  >
                    SAVE
                  </button>
                ) : (
                  <button
                    className={styles.update}
                    onClick={() => {
                      setUpdatedTitle(album.title); // Set the input value to current title
                      setEditingTitle(album.id);
                    }}
                  >
                    UPDATE
                  </button>
                )}
              </td>
              <td>
                <button
                  className={styles.delete}
                  onClick={() => dispatch(deleteAlbumAsync(album.id))}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlbumList;
