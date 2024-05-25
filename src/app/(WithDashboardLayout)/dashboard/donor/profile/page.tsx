import { useGetSingleUserQuery } from "@/redux/api/userApi";

const DonorProfile = () => {
  const { data, isLoading } = useGetSingleUserQuery({});
  console.log(data);
  return (
    <div>
      <h2>This is DonorProfile component</h2>
    </div>
  );
};

export default DonorProfile;
