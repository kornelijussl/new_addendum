// REACT
import * as React from "react";

// MATERIAL UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// COMPONENTS
import ApplicationBar from "../components/ApplicationBar";
import Drawer from "../components/Drawer";

// REACT BIG CALENDAR CSS
import "react-big-calendar/lib/css/react-big-calendar.css";

// REACT ROUTER DOM
import { Link } from "react-router-dom";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const mdTheme = createTheme();

export default function Page404() {
  // ### STATE

  const [open, setOpen] = React.useState(true);

  // ### HANDLERS
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <ApplicationBar open={open} toggleDrawer={toggleDrawer} />
        <Drawer open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl">
            <Box
              sx={{
                m: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "90vh",
                backgroundColor: "primary.main",
              }}
            >
              <Typography variant="h1" style={{ color: "white" }}>
                404
              </Typography>
              <Typography variant="h6" style={{ color: "white" }}>
                The page you’re looking for doesn’t exist.
              </Typography>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Button color="warning" variant="contained" sx={{ m: 2 }}>
                  Back Home
                </Button>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
