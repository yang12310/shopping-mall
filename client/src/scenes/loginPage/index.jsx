import * as React from 'react';
import { Formik} from "formik";
import * as yup from "yup";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from "state";

const initialValuesLogin = {
  email: "",
  password: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = async(values, onSubmitProps) => {
    const response = await fetch("http://localhost:3500/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    onSubmitProps.resetForm();

    if (data) {
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
      navigate("/");
    }

  };

  //자바스크립트에서 기본적으로 주는 함수 
  const handleFormSubmit = async (values, onSubmitProps) => {
    await loggedIn(values, onSubmitProps);
  };

  const goRegisgerPage = () => {
    navigate("/register");
  };

  return (
    <Formik
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
      onSubmit={handleFormSubmit}
    >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          })=>(
            <form onSubmit={handleSubmit}>
              <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        error={
                          Boolean(touched.email) && Boolean(errors.email)
                        }
                        helperText={touched.email && errors.email}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        error={
                          Boolean(touched.password) && Boolean(errors.password)
                        }
                        helperText={touched.password && errors.password}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link
                            onClick={goRegisgerPage}
                          variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
              </ThemeProvider>
            </form>
          )}
      
    </Formik>
  );
}