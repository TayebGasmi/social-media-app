import React from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "../../schemas/user.schema";
import InputText from "./../../layout/form/input/InputText";
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
import PasswordInput from "./../../layout/form/input/PasswordInput";
import { Link as RouteLink } from "react-router-dom";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
const initialValues = {
  password: "",
  email: "",
};
const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={async (values, { errors, setErrors }) => {
        try {
          const status = await login(values);
          console.log(status);
          if (status !== 200) {
            setErrors({
              email: "wrong password or email",
              password: "wrong password or email",
            });
            return;
          }
          navigate("/");
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
                Sign in
              </Typography>
              <Form>
                <Stack sx={{ mt: 1 }} spacing={2}>
                  <InputText type="text" name="email" placeholder="Email" />
                  <PasswordInput name="password" placeholder="Password" />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    type="submit"
                  >
                    Sign In
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
                      <Link
                        component={RouteLink}
                        to="/register"
                        variant="body2"
                      >
                        {" sign in"}
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

export default LoginForm;
