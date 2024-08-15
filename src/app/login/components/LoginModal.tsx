import PHModal from "@/components/Shared/PHModal/PHModal";
import { Box, Typography } from "@mui/material";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginModal = ({ open, setOpen }: TModalProps) => {
  return (
    <PHModal open={open} setOpen={setOpen} title="Demo Credentials">
      <Box>
        <Box>
          <Typography fontSize={20} fontWeight={500}>
            Donor:
          </Typography>
          <Typography>Email: sohan@gmail.com</Typography>
          <Typography>Password: sohan7679</Typography>
        </Box>
        <Box>
          <Typography fontSize={20} fontWeight={500}>
            Admin:
          </Typography>
          <Typography>Email: mohammadsakib7679@gmail.com</Typography>
          <Typography>Password: sakib7679</Typography>
        </Box>
      </Box>
    </PHModal>
  );
};

export default LoginModal;
