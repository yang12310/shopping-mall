import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik} from "formik";
import * as yup from "yup";
import OneButtonModal from 'widget/OneButtonModal';
import {useNavigate } from 'react-router-dom';

const initialValuesRegister = {
  name:"",
  password:"",
  email:"",
  phone:"",
  zipCode:"",
  address:""
};


const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  password: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup.string().required("required"),
  zipCode: yup.string().required("required"),
  address: yup.string().required("required"),
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

export default function RegisterPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const register = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:3500/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if(response.status === 204) {
      setOpen(true);
      return 
    }
    const user = await response.json();
  };

  const onGoPage = () => {
    setOpen(false)
    // navigate("/login")
  }





  //자바스크립트에서 기본적으로 주는 함수 
  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  return (

      <Formik
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
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
        <>
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
                    Sign up
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          error={
                            Boolean(touched.name) && Boolean(errors.name)
                          }
                          helperText={touched.name && errors.name}
                          autoComplete="given-name"
                          name="name"
                          required
                          fullWidth
                          id="name"
                          label="name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
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
                          label="email"
                          name="email"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
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
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phone}
                          error={
                            Boolean(touched.phone) && Boolean(errors.phone)
                          }
                          helperText={touched.phone && errors.phone}
                          required
                          fullWidth
                          id="phone"
                          label="phone"
                          name="phone"
                          autoComplete="phone"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.zipCode}
                          error={
                            Boolean(touched.zipCode) && Boolean(errors.zipCode)
                          }
                          helperText={touched.zipCode && errors.zipCode}
                          required
                          fullWidth
                          id="zipCode"
                          label="zipCode"
                          name="zipCode"
                          autoComplete="zipCode"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          error={
                            Boolean(touched.zipCode) && Boolean(errors.zipCode)
                          }
                          helperText={touched.zipCode && errors.zipCode}
                          required
                          fullWidth
                          id="address"
                          label="address"
                          name="address"
                          autoComplete="address"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="#" variant="body2">
                          이미 계정이 있으신가요? 로그인하기
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>
          </form>
          <OneButtonModal 
            open={open}
            setOpen = {setOpen}
            title = {"알림"}
            message = {"이미 이메일이 존재합니다."}
            buttonText={"닫기"}
            onGoPage={onGoPage}
          />
        </>
      )}
    </Formik>


  
   
  );
}