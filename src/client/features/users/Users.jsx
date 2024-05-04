import { useGetUserByIdQuery } from "./userSlice";

// import "./User.scss";

export default function User() {
  const { data: user, isLoading, error } = useGetUserByIdQuery();

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
      <section>
        <h1>User Info</h1>
        <p>Name: {user?.fullName}</p>
        <p>Email: {user?.email}</p>
      </section>
    </div>
  );
}
