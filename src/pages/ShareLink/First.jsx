import React, { useEffect, useState } from 'react';
// import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import './ShareLink.css';
import { FaOpencart } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { getDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';

const First = () => {
      const [user, setUser] = useState();
 useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(async (user) => {
     if (user) {
       const docSnap = await getDoc(doc(db, 'admin', user.uid));
       if (docSnap.exists()) {
         setUser(docSnap.data());
       }
     } else {
       setUser(null);
     }
   });

   return unsubscribe;
 }, []);
  return user? (
    <div>
      <div className=" pt-5 blip">
        <Tooltip title={user.fullName}>
          <IconButton sx={{ p: 0 }}>
            <Avatar
              alt={user.fullName}
              src="/static/images/avatar/1.jpg"
              style={{
                height: '80px',
                width: '80px',
                fontSize: '40px',
                fontWeight: 'bold',
              }}
            />
          </IconButton>
        </Tooltip>
        <div className="at">@{user.fullName}</div>
      </div>
    </div>
  ):null;
};

export default First;
