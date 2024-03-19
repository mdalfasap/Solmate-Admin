import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Logout(props) {
const navigate=useNavigate()
 

    const logoutAction=()=>{
      localStorage.removeItem('token')
      navigate('/')
    }

  const handleClose = () => {
    props.done(false)
  };

  return (
    <React.Fragment>
        <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { borderRadius: 10  ,width:'700px' } }} // Adjust size here
      >
        <DialogContent style={{ margin: 0, padding: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', backgroundColor: '#B2BEB5', width: '100%', position: 'relative', borderRadius: 10 }}>
            <Toaster />
            <p style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' ,marginBottom: '30px' }}>Are you sure you want to logout?</p> 
            <div>
              <button className="btn btn-warning   "style={{ marginRight: 10 ,width:'100px'}} onClick={handleClose}>Cancel</button>
              <button className="btn btn-danger " style={{ marginRight: 10 ,width:'100px' }} onClick={logoutAction}>Yes</button>  
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
