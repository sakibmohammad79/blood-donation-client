import { getuserInfo, removeUser } from "@/services/authService";
import { Box, Button, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";

const AuthButton = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userInfo = getuserInfo();
    if (userInfo) {
      setUserId(userInfo?.userId);
    }
  }, []);

  const handleLogOut = () => {
    removeUser();
    router.push("/");
    router.refresh();
  };
  return (
    <>
      {userId ? (
        <Box>
          <Box component={Link} href="/dashboard">
            <Tooltip title="Go to Dashboard">
              <IconButton size="large" sx={{ mr: 2, background: "Gray" }}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
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
