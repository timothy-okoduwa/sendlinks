// import { createContext, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase';
// import CircularProgress from '@mui/material/CircularProgress';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   useContext(AuthContext);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentuser) => {
//       console.log('Auth', currentuser);
//       setUser(currentuser);
//       setLoading(false)
//     });
//   }, []);
//   if (loading) {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//         }}
//       >
//         <CircularProgress style={{ width: '100px', height: '100px' }} />
//       </div>
//     );
//   }
//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;


import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log('Auth', currentuser);
      setUser(currentuser);
       setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress style={{ width: '70px', height: '70px' }} />
      </div>
    );
  }

  return (
    <userAuthContext.Provider
      value={{ user}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}