import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '/logo2.png';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Typography } from '@mui/material';
import { Bounce, toast } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/" style={{ color: '#FFFFFF', }}>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Signup() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();

  const Navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (!email || !password || !firstName || !lastName) {
        toast.error('Please Fill the Form', {
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
        
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const userObj = {
            firstName,
            lastName,
            email,
          };
          const uID = userCredential.user.uid;
          await setDoc(doc(db, "users", uID), userObj);
          toast.success('SignUp Successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })
          Navigate("/");
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
    } catch (error) {
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

    }
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"

                  onChange={(e) => setfirstName(e.target.value)}
                  fullWidth
                  id="firstName"
                  label="First Name"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) => setlastName(e.target.value)}

                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setemail(e.target.value)}

                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setpassword(e.target.value)}

                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
              </Grid>
            </Grid>
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2" style={{ color: '#FFFFFF', }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, color: '#FFFFFF', }} />
      </Container>
    </ThemeProvider>
  );
}