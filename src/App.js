import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import SignIn from './Auths/SignIn';
import SignUp from './Auths/SignUp';
import Admin from './pages/AdminDashboard/Admin';
import ProtectedRoute from './pages/AdminDashboard/ProtectedRoute';
import ShareLink from './pages/ShareLink/ShareLink';
import { db, auth } from './firebase';
import { getDoc, doc,onSnapshot } from 'firebase/firestore';
function App() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribeAuth = auth.onAuthStateChanged((user) => {
    if (user) {
      const docRef = doc(db, 'admin', user.uid);
      const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setUser(docSnap.data());
        }
      });
      return () => {
        unsubscribeSnapshot();
      };
    } else {
      setUser(null);
    }
  });
  return () => {
    unsubscribeAuth();
  };
}, []);


  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/share/:fullName" element={<ShareLink user={user} />} />
    
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
  
        </Routes>
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}
export default App;
