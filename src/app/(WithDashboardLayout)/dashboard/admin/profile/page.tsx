"use client";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

const AdminProfile = () => {
  const { data, isLoading } = useGetSingleUserQuery({});
  console.log(data);
  return (
    <div>
      <h2>This is AdminProfile component</h2>
    </div>
  );
};

export default AdminProfile;
