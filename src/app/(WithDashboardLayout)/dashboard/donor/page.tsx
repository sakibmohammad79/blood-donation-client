"use client";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";

const DonorDashboard = () => {
  const { data } = useGetAllDonorsQuery({});
  console.log(data);
  return (
    <div>
      <h2>This is DonorDashboard component</h2>
    </div>
  );
};

export default DonorDashboard;
