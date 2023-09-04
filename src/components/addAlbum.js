import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { albumSelector, addAlbumAsync } from "../reducer/albumReducer";
import styles from '../styles/addAlbum.module.css';

function AddAlbum() {
    const albums = useSelector(albumSelector);
    const dispatch = useDispatch();

    // Find the maximum existing ID and increment it by 1 for the new album
    const maxId = Math.max(...albums.map(album => album.id));
    const newAlbumId = maxId + 1;

    const [newAlbum, setNewAlbum] = useState({
        id: newAlbumId,
        userId: null, // Initialize as null
        title: ''
    });

    const handleAddAlbum = () => {
        const userIdAsNumber = parseInt(newAlbum.userId, 10); // Parse userId as an integer

        if (
            newAlbum.title.trim() !== "" &&
            !isNaN(userIdAsNumber) // Check if userId is a valid number
        ) {
            // Check if the album title is not empty and userId is a valid number
            dispatch(addAlbumAsync({ ...newAlbum, userId: userIdAsNumber })); // Pass the new album data object with userId as a number
            setNewAlbum({
                id: newAlbumId + 1,
                userId: null, // Reset to null
                title: ''
            });
        }
    };

    return (
        <div className={styles.container}>
            <form>
                <input
                    type="number"
                    placeholder={`${maxId + 1}`} // Set the placeholder dynamically
                    value={newAlbum.id}
                    disabled // Disable input for ID, as it's automatically generated
                />
                <input
                    type="text"
                    placeholder="User ID (Number)"
                    value={newAlbum.userId === null ? "" : newAlbum.userId}
                    onChange={(e) => setNewAlbum({ ...newAlbum, userId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={newAlbum.title}
                    onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                />
                <button type="button" onClick={handleAddAlbum}>ADD ALBUM</button>
            </form>
        </div>
    );
}

export default AddAlbum;
