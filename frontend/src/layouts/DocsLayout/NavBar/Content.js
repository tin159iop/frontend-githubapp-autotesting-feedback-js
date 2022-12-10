import { Link as RouterLink } from "react-router-dom";
import { Box, Divider, Link, Typography } from "@mui/material";
import NavData from "./NavData";
import NavList from "./NavList";

const Content = () => {
  return (
    <Box
      sx={{
        width: 262,
        marginTop: (theme) => theme.spacing(8),
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box p={2}>
        {NavData.map((section, index) => (
          <NavList section={section} key={index} />
        ))}
      </Box>
      <Divider />
      <Box p={2}>
        <Box
          p={2}
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h5" color="textPrimary">
            Have your problems solved?
          </Typography>
          <Link
            color="primary"
            component={RouterLink}
            variant="subtitle1"
            to="/home"
            sx={{ textDecoration: "none !important" }}
          >
            Go back to home
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
