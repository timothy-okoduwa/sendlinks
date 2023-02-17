import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { SiGoogleanalytics } from 'react-icons/si';
import Button from '@mui/material/Button';
import { AiFillStar } from 'react-icons/ai';
import { BsFillLockFill } from 'react-icons/bs';
import { db, auth } from '../../firebase';
import {
  getDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  collection,
  updateDoc,
} from 'firebase/firestore';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = useState([]);
  const [active, setActive] = useState(() => {
    const savedItem = localStorage.getItem('localval');
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || false;
  });
  const [star, setStar] = useState(() => {
    const savedItems = localStorage.getItem('star');
    const parsedItems = JSON.parse(savedItems);
    return parsedItems || false;
  });
  const [lock, setLock] = React.useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const handleStar = () => {
    setStar(!star);
  };
  const handleLock = () => {
    setLock(!lock);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    const docRef = doc(db, 'admin', auth?.currentUser?.uid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('star', JSON.stringify(star));
  }, [star]);
  useEffect(() => {
    localStorage.setItem('localval', JSON.stringify(active));
  }, [active]);

const deleteUser = async () => {
  if (window.confirm(`Are you sure you want to delete`)) {
    const listDoc = doc(db, 'admin', auth?.currentUser?.uid, 'link' );
    await deleteDoc(listDoc);
  }
};


  // const deleteListObject = async (listId) => {
  //   const userDocRef = doc(db, 'admin', auth?.currentUser?.uid);

  //   const userDocSnap = await getDoc(userDocRef);
  //   const userData = userDocSnap.data();

  //   const updatedList = userData.list.filter((list) => list.id !== listId);

  //   await updateDoc(userDocRef, { list: updatedList });
  // };



  console.log(deleteUser);
  return user ? (
    <>
      {user?.link?.map((linkItem, index) => (
        <div>
          <Card
            style={{
              maxWidth: '100%',
              borderRadius: '18px',
              marginBottom: '30px',
            }}
            key={user?.uid}
            disabled
          >
            <div className="container d-flex align-items-center">
              <CardHeader
                avatar={
                  <Avatar style={{ backgroundColor: 'lightgrey' }}></Avatar>
                }
              />
              <div> {linkItem?.name || linkItem?.wame}</div>
            </div>

            <div
              className="container px-4"
              style={{ opacity: lock ? '0.1' : '0.8' }}
            >
              {linkItem?.whatsappNumber || (
                <a href={linkItem?.value} style={{ textDecoration: 'none' }}>
                  {linkItem?.value?.length > 20
                    ? `${linkItem?.value?.substring(0, 24)}...`
                    : linkItem?.value}
                </a>
              )}
              <span
                className="px-3"
                style={{ opacity: '0.7', fontSize: '13px' }}
              >
                {user?.TimeAdded?.toDate()?.toDateString()}
              </span>
            </div>
            <CardActions
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContnent: 'center',
              }}
            >
              <div>
                <IconButton aria-label="add to favorites" className="mx-4 mt-2">
                  <FavoriteIcon
                    onClick={handleClick}
                    style={{
                      color: active ? 'red' : 'grey',
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{ fontSize: '15px', marginLeft: '8px' }}>
                    {active ? '1' : '0'}
                  </span>
                </IconButton>
              </div>

              <IconButton aria-label="add to favorites" className="mx-4 mt-2">
                <AiFillStar
                  onClick={handleStar}
                  style={{ color: star ? 'gold' : 'grey', cursor: 'pointer' }}
                />
              </IconButton>
              <IconButton aria-label="add to favorites" className="mx-4 mt-2">
                <BsFillLockFill
                  onClick={handleLock}
                  style={{ cursor: 'pointer' }}
                />
              </IconButton>
              <div
                aria-label="add to favorites"
                className="mx-4 mt-2"
                style={{ color: 'grey' }}
              >
                <SiGoogleanalytics style={{ fontSize: '20px' }} />
                <span style={{ fontSize: '15px', marginLeft: '8px' }}>
                  {user.clicks || 0} clicks
                </span>
              </div>

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <DeleteIcon onClick={deleteUser} />
              </ExpandMore>
            </CardActions>
          </Card>
        </div>
      ))}
    </>
  ) : null;
}
