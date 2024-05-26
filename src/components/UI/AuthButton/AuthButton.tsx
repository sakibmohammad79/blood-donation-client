import { getuserInfo, removeUser } from "@/services/authService";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = getuserInfo();

  const handleLogOut = () => {
    removeUser();
    router.push("/");
    router.refresh();
  };
  return (
    <>
      {userInfo?.userId ? (
        <Box>
          <Box component={Link} href="/dashboard">
            <IconButton size="large" sx={{ mr: 2, background: "gray" }}>
              <AccountCircle />
            </IconButton>
          </Box>
          <Button onClick={handleLogOut} color="error">
            Logout
          </Button>
        </Box>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
