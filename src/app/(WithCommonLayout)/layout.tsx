import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      <Box sx={{ minHeight: "100vh" }}>{children}</Box>
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
