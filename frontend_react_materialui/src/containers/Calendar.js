// REACT
import * as React from "react";

// MATERIAL UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton } from "@mui/material";

// COMPONENTS
import ApplicationBar from "../components/ApplicationBar";
import Drawer from "../components/Drawer";
import AppointmentCalendar from "../components/AppointmentCalendar";

// REACT BIG CALENDAR CSS
import "react-big-calendar/lib/css/react-big-calendar.css";

// API
import { getAllAppointmentsApiCall } from "../api/appointmentAPI";

// NOTISTACK
import { useSnackbar } from "notistack";

// ICONIFY
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@iconify/react";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const mdTheme = createTheme();

export default function Calendar() {
  // ### STATE
  const [appointments, setAppointments] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [open, setOpen] = React.useState(true);

  // ### HOOKS
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // ### LIFECYCLES
  React.useEffect(() => {
    try {
      setIsLoading(true);

      (async () => {
        const data = await getAllAppointmentsApiCall();
        setAppointments(data);
      })();
    } catch (error) {
      enqueueSnackbar(
        error.name === "AxiosError" ? error.response.data : error.toString(),
        {
          variant: "error",
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </IconButton>
          ),
        },
      );
    } finally {
      setIsLoading(false);
    }
  }, [closeSnackbar, enqueueSnackbar]);

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
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid>
              {isLoading ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "90vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Paper
                  sx={{
                    p: 2,
                  }}
                >
                  <AppointmentCalendar appointments={appointments} />
                </Paper>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
