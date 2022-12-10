import { NavLink as RouterLink } from "react-router-dom";
import { Button, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(1.5),
  justifyContent: "flex-start",
  textTransform: "none",
  letterSpacing: 0,
  width: "100%",
  fontWeight: theme.typography.fontWeightMedium,
}));

const NavList = ({ section }) => {
  return (
    <List disablePadding>
      {section.items.map((item) => {
        return (
          <ListItem
            sx={{ display: "flex", paddingTop: 0, paddingBottom: 0 }}
            disableGutters
            key={item.title}
          >
            <NavButton
              component={RouterLink}
              to={item.href}
              sx={{
                paddingLeft: (theme) => theme.spacing(1),
              }}
            >
              <span>{item.title}</span>
            </NavButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default NavList;
