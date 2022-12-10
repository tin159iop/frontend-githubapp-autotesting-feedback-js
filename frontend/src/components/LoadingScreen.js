import { Box, LinearProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        minHeight: "100%",
        padding: (theme) => theme.spacing(3),
      }}
    >
      <Box width={600}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
