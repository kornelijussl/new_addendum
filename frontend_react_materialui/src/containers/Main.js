// REACT
import * as React from "react";

// MATERIAL UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

// COMPONENTS
import AppointmentForm from "../components/AppointmentForm";
import ApplicationBar from "../components/ApplicationBar";
import Drawer from "../components/Drawer";

// REACT BIG CALENDAR CSS
import "react-big-calendar/lib/css/react-big-calendar.css";
import FlagsSelect from "../components/FlagsSelect";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const mdTheme = createTheme();

export default function Main() {
  // ### STATE
  const [isAppointmentFormLoading, setIsAppointmentFormLoading] =
    React.useState(false);
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
          <Box sx={{ display: "flex", justifyContent: "end", p: 2 }}>
            <FlagsSelect />
          </Box>

          <Container maxWidth="xl">
            <Paper sx={{ p: 2, m: 2 }}>
              <AppointmentForm
                setIsAppointmentFormLoading={setIsAppointmentFormLoading}
                isAppointmentFormLoading={isAppointmentFormLoading}
              />
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
