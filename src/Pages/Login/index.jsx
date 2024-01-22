import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '/logo2.png';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Bounce, toast } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/" style={{ color: '#ffffff' }}>
        ToDo App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const userUid = userCredential.user.uid;
        localStorage.setItem("uid", userUid);
        const docs = await getDoc(doc(db, "users", userUid));

        // console.log(docs.data(), "docs");
        localStorage.setItem("userData", JSON.stringify(docs.data()));   

        toast.success('LogIn Successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });     
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error('Something Went Wrong. Please Try Again', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
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

          <img src={logo} alt="" style={{ width: '15%', borderRadius: '50%' }} />

          <Typography component="h1" variant="h5" sx={{ mt: '20px', fontWeight: 'bolder' }}>
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              onChange={(e) => setemail(e.target.value)}

              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                background: 'white',
                borderRadius: '5px',
                border: 'none',
                '& label': {
                  color: '#B864F0',
                },
                '& label.Mui-focused': {
                  color: '#B864F0',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#B2BAC2',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E3E7',
                  },
                  '&:hover fieldset': {
                    borderColor: '#B2BAC2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#B864F0',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              onChange={(e) => setpassword(e.target.value)}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                background: 'white',
                borderRadius: '5px',
                border: 'none',

                '& label': {
                  color: '#B864F0',
                },

                '& label.Mui-focused': {
                  color: '#B864F0',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#B2BAC2',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E3E7',
                  },
                  '&:hover fieldset': {
                    borderColor: '#B2BAC2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#B864F0',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2,
                backgroundColor: '#B864F0',
                // 
                '&:hover': {
                  backgroundColor: '#B864F0',
                },
              }}
            >
              Sign In
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link to="/signup" variant="body2" style={{ color: '#ffffff' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4, color: '#FFFFFF', }} />
      </Container>
    </ThemeProvider>
  );
}