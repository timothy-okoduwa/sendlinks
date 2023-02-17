import React, { useState } from 'react';
import './Auth.css';
import l from './image/Linktree.png';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FaOpencart } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
const SignIn = () => {
  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  //setting up the input
  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
    loading: false,
  });
  //destructuring from the state
  const { email, password, error, loading } = data;

  //writitng the onchange function to target via name and then value
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //writing the submit function
  const handleSubmit = async (e) => {
    // preventing the default behavour of the handle submit function (which is to refresh)
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    //setting an error if the fields are empty
    if (!email || !password) {
      setData({ ...data, error: 'All fields are required' });
    }

    //writing the firebase create function
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      //passing our register credentials to our database storage
      await updateDoc(doc(db, 'admin', result.user.uid), {
        isOnline: true,
      });
      setData({
        email: '',
        password: '',
        error: null,
        loading: false,
      });
      navigate('/');
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <div className="containerr">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="mainFormHolder">
              <div>
                <FaOpencart style={{ fontSize: '45px' }} />
              </div>
              <div className="container mt-5">
                <div className="log">
                  We've Missed You Here @SendLinks <FaOpencart />
                </div>
                <div className="form mt-5">
                  {error ? (
                    <Collapse in={open}>
                      <Alert
                        severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        {error}
                      </Alert>
                    </Collapse>
                  ) : null}

                  <div className="mt-5">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      style={{ width: '100%' }}
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <FormControl
                      style={{ width: '100%' }}
                      variant="outlined"
                      className="mt-5"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                </div>

                <Stack
                  spacing={2}
                  direction="row"
                  className="mt-5 d-flex justify-content-center"
                >
                  <Button
                    variant="outlined"
                    style={{ width: '200px', height: '45px' }}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress
                        variant="determinate"
                        value={progress}
                        style={{ width: '25px', height: '25px' }}
                      />
                    ) : (
                      'Welcome Back'
                    )}
                  </Button>
                </Stack>

                <div className="mt-5 dont">
                  Want To Fly With Us ?{' '}
                  <Link to="/signup">
                    {' '}
                    <b>Sign Up</b>
                  </Link>{' '}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 ok">
            <div>
              <img src={l} alt="wow" className="link" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
