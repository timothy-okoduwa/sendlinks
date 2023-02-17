import React from 'react';
import './Admin.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BiPlus } from 'react-icons/bi';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../../firebase';
import {
  doc,
  serverTimestamp,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import GetNumber from './GetNumber';
const AddLinkPage = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [ok, setOk] = React.useState();
const [link,setLink]= React.useState('')
  const omoh = () => {
    const numberStr = ok.toString();
    const res = numberStr.replace(numberStr[0], '');
    console.log(Number(res));
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleAdd = async () => {
    const docRef = doc(db, 'admin', auth.currentUser.uid);
      const uuid = uuidv4();
    const newLink = {
      whatsappNumber: ok,
      wid: uuid,
      wame: 'Number',
    };
    await updateDoc(docRef, {
      link: arrayUnion(newLink),
    });
    setOk();

  };
const handleAdd2 = async () => {
  const docRef = doc(db, 'admin', auth.currentUser.uid);
  const uuid = uuidv4();
  const newLink = {
      id: uuid,
        value: link,
      name: 'Some name',
  };
  await updateDoc(docRef, {
    link: arrayUnion(newLink),
  });

  setLink('');
};

console.log(handleAdd2)
  // const createPage = () => {
  //   if (authUser && pageName && pageLinks.length) {
  //     fb.firestore
  //       .collection('linkPages')
  //       .add({
  //         userId: authUser.uid,
  //         links: pageLinks,
  //         name: pageName,
  //       })
  //       .then(() => {
  //         history.push('/');
  //       });
  //   }
  // };
// console.log(handleAdd2);

  return (
    <div style={{ marginTop: '85px' }}>
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-12 col-lg-7 mb-4">
            <div className="">
              <div>
                <Accordion
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    width: '100%',
                    border: 'none',
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{
                      backgroundColor: '#7d3ac0',
                      borderRadius: '20px',
                      color: 'white',
                      height: '60px',
                    }}
                  >
                    <Typography
                      style={{ marginLeft: '30%', textAlign: 'center' }}
                    >
                      {' '}
                      <BiPlus style={{ fontSize: '30px' }} /> Add WhatsApp Link
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="container">
                    <Typography>
                      <div style={{ opacity: '0' }}>
                        {' '}
                        Nulla facilisi. Phasellus sollicitudin nulla et quam
                        mattis feugiat. Aliquam eget maximus est, id dignissim
                        quam.{' '}
                      </div>
                      <div className="omohh">
                        <div>Enter WhatsApp Number</div>
                        <div className="pine mt-3">
                          <PhoneInput
                            displayInitialValueAsLocalNumber
                            defaultCountry="NG"
                            value={ok}
                            onChange={(ok) => setOk(ok)}
                            className="mx-3 wow"
                            style={{ width: '100%' }}
                          />

                          <Button
                            variant="outlined"
                            onClick={handleAdd}
                            disabled={!ok}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </Typography>

                    <Typography>
                      <div style={{ margin:'20px' }}>
                        {' '}
                        Please only add the links one at a time!!
                      {' '}
                      </div>
                      <div className="omohh">
                        <div>Enter Other Links</div>
                        <div className="pine mt-3">
                          <TextField
                            id="outlined-basic"
                            label="your website Url"
                            variant="outlined"
                            className="mx-3 "
                            style={{ width: '100%' }}
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                          />
                          <Button
                            variant="outlined"
                            onClick={handleAdd2}
                            disabled={!link}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
            <GetNumber />
          </div>
          <div className="col-12 col-lg-5 d-flex justify-content-center ">
            222
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkPage;
