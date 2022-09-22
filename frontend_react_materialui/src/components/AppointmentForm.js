// REACT
import * as React from "react";

// REACT MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// COMPONENTS

// DAYJS
import dayjs from "dayjs";
import LocalizedDatePicker from "./LocalizedDatePicker";

// MOMENT
import moment from "moment";
import { createNewAppointmentApiCall } from "../api/appointmentAPI";

// NOTISTACK
import { useSnackbar } from "notistack";

// ICONIFY
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@iconify/react";

// REACT-I18NEXT
import { useTranslation } from "react-i18next";

// -------------------------------------------------------------------------------------------------------------------------------

const theme = createTheme();

export default function AppointmentForm({
  isAppointmentFormLoading,
  setIsAppointmentFormLoading,
}) {
  // ### STATE

  const [datePickerValue, setDatePickerValue] = React.useState(dayjs());
  const [timePickerValue, setTimePickerValue] = React.useState(dayjs());

  // ### HOOKS

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation();

  // ### HANDLERS

  const handleSubmit = async (event) => {
    try {
      setIsAppointmentFormLoading(true);
      event.preventDefault();

      const momentTime = moment(timePickerValue.$d);
      const momentDate = moment(datePickerValue.$d);

      const appointmentMoment = moment({
        year: momentDate.year(),
        month: momentDate.month(),
        day: momentDate.date(),
        hour: momentTime.hours(),
        minute: momentTime.minutes(),
      });

      const formData = new FormData(event.currentTarget);

      const appointmentDTO = {
        patientName: formData.get("patientName").toLowerCase(),
        patientSurname: formData.get("patientSurname").toLowerCase(),
        appointmentDateTime: appointmentMoment._d,
      };

      await createNewAppointmentApiCall(appointmentDTO);

      setDatePickerValue(dayjs());
      setTimePickerValue(dayjs());

      enqueueSnackbar(t("AppointmentForm.successText"), {
        variant: "success",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </IconButton>
        ),
      });
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
      setIsAppointmentFormLoading(false);
    }
  };

  // ### HANDLERS ENDS

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 8,
            mb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
          }}
        >
          {isAppointmentFormLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <AddIcon />
              </Avatar>
              <Typography align="center" component="h1" variant="h5">
                {t("AppointmentForm.createAppointmentText")}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  label={t("AppointmentForm.patientName")}
                  required
                  fullWidth
                  name="patientName"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  label={t("AppointmentForm.patientSurname")}
                  required
                  fullWidth
                  name="patientSurname"
                />
                <LocalizedDatePicker
                  setTimePickerValue={setTimePickerValue}
                  setDatePickerValue={setDatePickerValue}
                  datePickerValue={datePickerValue}
                  timePickerValue={timePickerValue}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t("AppointmentForm.submitButtonText")}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
