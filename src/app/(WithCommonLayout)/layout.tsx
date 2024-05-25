import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { Box } from "@mui/material";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      <Box sx={{ minHeight: "100%" }}>{children}</Box>
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
