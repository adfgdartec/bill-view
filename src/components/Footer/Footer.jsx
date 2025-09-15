import * as React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "grey.300",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Your Company
            </Typography>
            <Typography variant="body2" color="grey.400">
              Building solutions that make an impact.  
              Professional footer with MUI.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              Links
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block">
              Home
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              About
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Services
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Contact
            </Link>
          </Grid>

          {/* Social Icons */}
          <Grid item xs={12} md={4} textAlign={{ xs: "left", md: "right" }}>
            <Typography variant="subtitle1" gutterBottom>
              Follow Us
            </Typography>
            <IconButton color="inherit" href="https://github.com/">
              <GitHub />
            </IconButton>
            <IconButton color="inherit" href="https://linkedin.com/">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com/">
              <Twitter />
            </IconButton>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box
          mt={4}
          borderTop={1}
          borderColor="grey.800"
          pt={3}
          textAlign="center"
        >
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
