import { Card, Avatar, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Page from "components/Page";
import Header from "./Header";


export const CardLight = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const CardDark = styled(Card)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const AvatarLight = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.contrastText,
  color: theme.palette.secondary.main,
  height: 48,
  width: 48,
}));

export const AvatarDark = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  height: 48,
  width: 48,
}));


const DashboardView = () => {
  return (
    <Page title="Kiki: Dashboard">
      <Container maxWidth="xl">
        <Header />

        {/* Add stuff to dashboard here */}

      </Container>
    </Page>
  );
};

export default DashboardView;
