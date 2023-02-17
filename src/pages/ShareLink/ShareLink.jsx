import React, { useEffect, useState } from 'react';
import './ShareLink.css';
import { FaOpencart } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase';
import {AiOutlineLink} from 'react-icons/ai'
import {
  doc,
  onSnapshot,
  updateDoc,
  increment,
  query,
  collection,
  setDoc,
} from 'firebase/firestore';
import First from './First';
const ShareLink = ({user}) => {
//   const [user, setUser] = useState();
// useEffect(() => {
//   const q = query(
//     collection(db, 'whatsapp', auth.currentUser.uid, 'detail')
//   );
//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     let todosArr = [];
//     querySnapshot.forEach((doc) => {
//       todosArr.push({ ...doc.data(), id: doc.id });
//     });
//     setUser(todosArr);
//   });
//   return () => unsubscribe();
// }, []);

  return user ? (
    <div
      style={{
        background: 'lightgrey',
        paddingBottom: '10px',
        height: '100%',
      }}
    >
      <First />

      <>
        {user?.link?.map((linkItem, index) => (
          <div className="cardsHolder container" key={linkItem.id}>
            <div className="pin ">
              {linkItem.value && (
                <a
                  href={linkItem.value}
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                  rel="noreferrer"
                  className="worksd"
                >
                  <div className="three container">
                    <div>
                      <AiOutlineLink className="bs" />
                    </div>
                    <div className="okef">
                      <a
                        href={linkItem.value}
                        style={{ textDecoration: 'none' }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {linkItem.name.length > 20
                          ? `${linkItem.name.substring(0, 24)}...`
                          : linkItem.name}
                      </a>
                    </div>
                    <div>
                      <FiShare className="bsc" />
                    </div>
                  </div>
                </a>
              )}
              {linkItem.whatsappNumber && (
                <a
                  href={`https://api.whatsapp.com/send?phone=${Number(
                    linkItem.whatsappNumber
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="worksd"
                >
                  <div className="three container">
                    <div>
                      <BsWhatsapp className="bs" />
                    </div>
                    <div className="okef">
                      <a
                        href={`https://api.whatsapp.com/send?phone=${Number(
                          linkItem.whatsappNumber
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="pin"
                      >
                        {linkItem.wame}
                      </a>
                    </div>
                    <div>
                      <FiShare className="bsc" />
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        ))}
      </>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="morelike">
          <FaOpencart />
          SendLinks
        </div>
      </Link>
    </div>
  ) : null;
};

export default ShareLink;
       