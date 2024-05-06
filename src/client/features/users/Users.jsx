import { useState, useEffect } from "react";
import { useGetUserByIdQuery, useEditUserMutation } from "./userSlice";

export default function User() {
  const { data: user, isLoading, error } = useGetUserByIdQuery();
  const [editUser, { isLoading: isSaving, isSuccess, isError }] =
    useEditUserMutation();

  const [isEditMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        fullName: user.fullName || "",
        email: user.email || "",
        password: user.password || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.id) {
      await editUser({ id: user.id, data: userData });
      setEditMode(false);
    }
  };

  if (isLoading) {
    return <p>Loading user information...</p>;
  }

  if (error) {
    return <p>Failed to load user information. Please try again later.</p>;
  }

  if (!user) {
    return <p>No user information found.</p>;
  }

  return (
    <div className='user-info'>
      {isEditMode ? (
        <section>
          <h1>Edit User Info</h1>
          {isSaving && <p>Saving changes...</p>}
          {isSuccess && <p>Changes saved successfully!</p>}
          {isError && <p>Failed to save changes. Please try again later.</p>}

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='fullName'>Full Name:</label>
              <input
                type='text'
                name='fullName'
                placeholder='First Name Last Name'
                value={userData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                name='email'
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                name='password'
                value={userData.password}
                onChange={handleChange}
                autoComplete='current-password'
                required
              />
            </div>
            <button type='submit'>Save Changes</button>
            <button type='button' onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        </section>
      ) : (
        <section>
          <h1>User Info</h1>
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button onClick={() => setEditMode(true)}>Change Info</button>{" "}
        </section>
      )}
    </div>
  );
}
