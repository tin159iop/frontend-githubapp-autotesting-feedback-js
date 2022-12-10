/* eslint-disable no-use-before-define */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Drawer } from "@mui/material";
import PropTypes from "prop-types";
import Content from "./Content";

const NavBar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  /*eslint-disable */
  useEffect(() => {
    if (openMobile && onMobileClose) onMobileClose();
  }, [location.pathname]);
  /*eslint-disable */

  // mobile navigation first
  // desktop navigation second
  return (
    <>
      <Drawer
        anchor="left"
        sx={{ width: 262, display: { xs: "block", md: "none" } }}
        open={openMobile}
        onClose={onMobileClose}
        variant="temporary"
      >
        <Content />
      </Drawer>

      <Drawer
        anchor="left"
        open
        variant="persistent"
        sx={{
          width: 262,
          display: { xs: "none", md: "block" },
        }}
      >
        <Content />
      </Drawer>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
