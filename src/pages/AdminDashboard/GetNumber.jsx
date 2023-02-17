import React from 'react'
import './Admin.css'
import Card from './Card'
const GetNumber = () => {
  return (
    <div className='mt-5'>
      <div className="same">All Your Numbers</div>
      <div className="wow5">
         <div>
            <Card/>
         </div>
      </div>
     
    </div>
  );
}

export default GetNumber