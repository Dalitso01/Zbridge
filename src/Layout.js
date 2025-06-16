import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 4, md: 8 } }}>
      <Box sx={{ minHeight: "80vh" }}>
        {children}
      </Box>
    </Container>
  </>
);

export default Layout;
