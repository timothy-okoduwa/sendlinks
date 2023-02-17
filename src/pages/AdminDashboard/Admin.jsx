import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import AddLinkPage from './AddLinkPage'

const Admin = () => {
  return (
    <div
      style={{
        backgroundColor: '#F3F3F1',
        height: '100vh',
        paddingTop: '20px',
        paddingBottom: '580px',
      }}
    >
      <ResponsiveAppBar />
      <AddLinkPage />
  
    </div>
  );
}

export default Admin