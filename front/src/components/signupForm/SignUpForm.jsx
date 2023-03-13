import React from "react";
import { Formik, Form } from "formik";
import { registerSchema } from "../../schemas/user.schema";
import InputText from "../../layout/form/input/InputText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import PasswordInput from "../../layout/form/input/PasswordInput";
import { Link as RouteLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
const initialValues = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  phone: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={async (values) => {
        try {
          await register(values);
          navigate("/login");
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/0x0.jpg?format=jpg&width=1200&fbclid=IwAR2v72twXMCm1mis_Dy38O7IKxHYBYd_vTm2uqZuNgr_rwqlpPkvz6WISBw)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Form>
                <Stack sx={{ mt: 1 }} spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <InputText
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                    <InputText
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                  </Stack>
                  <InputText type="text" name="email" placeholder="Email" />
                  <InputText type="text" name="phone" placeholder="Phone" />
                  <PasswordInput name="password" placeholder="Password" />
                  <PasswordInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ mt: 3, mb: 2 }}
                    type="submit"
                  >
                    Sign Up
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link
                        component={RouteLink}
                        to="/resetPassword"
                        variant="body2"
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link component={RouteLink} to="/login" variant="body2">
                        {"login "}
                      </Link>
                    </Grid>
                  </Grid>
                </Stack>
              </Form>
            </Box>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default SignUpForm;
