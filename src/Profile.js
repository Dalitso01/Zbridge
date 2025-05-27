import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      setUser(u);
      setDisplayName(u?.displayName || "");
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await user.updateProfile({ displayName });
      setMessage("Profile updated!");
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <button type="submit">Update Name</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/">Home</Link>
    </div>
  );
};

export default Profile;