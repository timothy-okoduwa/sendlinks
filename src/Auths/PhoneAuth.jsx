import React, { useState,useEffect } from 'react';
import './Auth.css';
import l from './image/Linktree.png';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Alert from '@mui/material/Alert';
import { GiPaperPlane } from 'react-icons/gi';
import { FaOpencart } from 'react-icons/fa';
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getAuth,
  browserSessionPersistence,
} from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
// import { setDoc, doc, Timestamp } from 'firebase/firestore';
  import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    doc,
    Timestamp,
  } from 'firebase/firestore';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import ImprovedAuth from './ImprovedAuth';
// import { FormHelperText } from '@mui/material';

const PhoneAuth = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const [result, setResult] = useState('');
  const [otp, setOtp] = React.useState('');
    const [flag, setFlag] = useState(false);
  const [error, setError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
      const [businessName, setBusinessName] = useState('');
const [businessNameExists, setBusinessNameExists] = useState(false);
  const [data, setData] = useState({
 
    password: '',
    loading: false,
  });


  const handleChange2 = (newValue) => {
    setOtp(newValue);
  };

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
  const navigate = useNavigate();

  //destructuring from the state
  const {   password, loading } = data;

function setUpRecaptha(number) {
  const authInstance = getAuth();
  authInstance.setPersistence(browserSessionPersistence);
  const recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',
    {
      size: 'invisible',
      siteKey: '6LdvO5skAAAAAMCyh7vpFAhCI0XDOLPPkuqK0BBG',
      secretKey: '6LdvO5skAAAAABceHCEVUqQz0CEVgfhntr5iyxXg',
    },
    authInstance
  );
  recaptchaVerifier.render();
  return signInWithPhoneNumber(authInstance, number, recaptchaVerifier);
}

  const getOtp = async () => {
    console.log(phoneNumber);
    setError('');
    console.log(error);
    if (phoneNumber === '' || phoneNumber === undefined)
      return setError('Please enter a valid phone number!');
    try {
      const response = await setUpRecaptha(phoneNumber);
      setResult(response);
         setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  // const verifyOtp = async () => {
  //   setData({ ...data, error: null, loading: true });
  //   setError('');
  //   if (otp === '' || otp === null) return;
  //   if (!businessName || !phoneNumber || !password || !otp) {
  //     setData({ ...data, error: 'All documents are needed to Fly' });
  //   }
  //   try {
  //     await result.confirm(otp);
  //     await setDoc(doc(db, 'admin', auth?.currentUser?.uid), {
  //       uid: auth?.currentUser?.uid,
  //       businessName,
  //       phoneNumber,
  //       password,
  //       otp,
  //       createdAt: Timestamp.fromDate(new Date()),
  //     });
  //     setData({
  //       businessName: '',
  //       phoneNumber: '',
  //       password: '',
  //       error: null,
  //       loading: false,
  //       otp: '',
  //     });
  //     navigate('/');
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
   useEffect(() => {
     async function checkBusinessNameExists() {
       const querySnapshot = await getDocs(
         query(
           collection(db, 'admin'),
           where('businessName', '==', businessName)
         )
       );
       setBusinessNameExists(!querySnapshot.empty);
     }
     if (businessName) {
       checkBusinessNameExists();
     }
   }, [businessName]);

   function handleBusinessNameChange(event) {
     setBusinessName(event.target.value);
   }


  const verifyOtp = async () => {
    setData({ ...data, error: null, loading: true });
    setError('');
    if (otp === '' || otp === null) return;
    if (!businessName || !phoneNumber || !password || !otp) {
      setData({ ...data, error: 'All documents are needed to Fly' });
    }

    // Check if the business name already exists
    const q = query(
      collection(db, 'admin'),
      where('businessName', '==', businessName)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setData({ ...data, error: 'Business name already exists' });
      return;
    }

    try {
      await result.confirm(otp);
      await setDoc(doc(db, 'admin', auth?.currentUser?.uid), {
        uid: auth?.currentUser?.uid,
        businessName,
        phoneNumber,
        password,
        otp,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setData({
        businessName: '',
        phoneNumber: '',
        password: '',
        error: null,
        loading: false,
        otp: '',
      });
      navigate('/');
    } catch (err) {
      setError(err.Message);
    }
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //writing the submit function
  const handleSubmit = async () => {
    // preventing the default behavour of the handle submit function (which is to refresh)

    setData({ ...data, error: null, loading: true });
    //setting an error if the fields are empty
    if (!businessName || !phoneNumber || !password || !otp) {
      setData({ ...data, error: 'All documents are needed to Fly' });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="mainFormHolder">
              <div>
                {' '}
                <FaOpencart style={{ fontSize: '45px' }} />
              </div>
              <div className="container mt-5">
                <div className="log">
                  Fly With Us @SendLinks <GiPaperPlane />
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
                      label="Business Name"
                      variant="outlined"
                      style={{ width: '100%' }}
                      name="businessName"
                      value={businessName}
                      onChange={handleBusinessNameChange}
                      // FormHelperText="hello"

                      helperText="Do not put space in your Business names"
                      required
                    />
                  </div>
                  {businessNameExists && (
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#ff0000',
                        paddingLeft: '18px',
                        marginBottom: '8px',
                      }}
                    >
                      An account with <b>{businessName}</b> already exists. Please choose a
                      different Business name.
                    </p>
                  )}

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
                        required
                        helperText="Trust us,confidentiality is our watch Word "
                      />
                    </FormControl>
                  </div>
                  <div>
                    <div style={{ display: !flag ? 'block' : 'none' }}>
                      <div>
                        <div className="mt-5">
                          <PhoneInput
                            defaultCountry="NG"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            placeholder="Enter Phone Number"
                            className="px-3 wow"
                            required
                          />
                          <span
                            style={{
                              fontSize: '12px',
                              color: '#90908F',
                              paddingLeft: '18px',
                              marginBottom: '8px',
                            }}
                          >{`sendlinks.com/${phoneNumber}`}</span>
                        </div>
                        <div id="recaptcha-container"></div>
                      </div>
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <Button variant="outlined" onClick={getOtp}>
                          Request OTP
                        </Button>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: flag ? 'block' : 'none' }}>
                        <div className="mt-4">
                          <div
                            style={{
                              fontSize: '12px',
                              color: '#90908F',
                              paddingLeft: '18px',
                              marginBottom: '8px',
                            }}
                          >
                            Please enter the OTP sent to your Number
                          </div>
                          <MuiOtpInput
                            length={6}
                            value={otp}
                            onChange={handleChange2}
                          />
                        </div>
                      </div>
                      {/* <div>4</div> */}
                    </div>
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
                    type="submit"
                    onClick={() => {
                      verifyOtp();
                    }}
                    disabled={
                      loading || !businessName || !phoneNumber || !password
                    }
                  >
                    {loading ? (
                      <CircularProgress
                        variant="determinate"
                        value={progress}
                        style={{ width: '25px', height: '25px' }}
                      />
                    ) : (
                      'Welcome Aboard'
                    )}
                  </Button>
                </Stack>

                <div className="mt-5 dont">
                  Already Flying with Us ?{' '}
                  <Link to="/signin">
                    {' '}
                    <b>Sign In</b>
                  </Link>{' '}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 ok ">
            <div>
              {/* <img src={l} alt="wow" className="link" /> */}
              {/* hfhdhd */}
            </div>
          </div>
        </div>
      </div>
      {/* <ImprovedAuth /> */}
    </div>
  );
};
export default PhoneAuth;
