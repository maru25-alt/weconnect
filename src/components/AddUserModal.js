import React, {useState} from 'react';
import {
     Button,
     Dialog,
     DialogActions, 
     DialogContent,
     DialogTitle,
     useMediaQuery
    } from '@material-ui/core';
    import { useTheme } from '@material-ui/core/styles';
import axios from '../store/axios';
import { useSelector} from 'react-redux';
import {selectUser} from '../store/slices/userSlice';
import {useHistory} from 'react-router-dom';
import {  toast } from 'react-toastify';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function AddUserModal() {
    const [show, setShow] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [userId, setuserId] = useState("");
    const history = useHistory();
    const user = useSelector(selectUser);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConnect = () => {
        console.log("submitted")
        if(userId){
            axios.post('/messages/connect', {user1: user?.id, user2: userId})
            .then(res => {
                console.log("res", res)
                if(res.data.success){
                    setShow(false);
                    history.push(`/messages/${res.data.doc}`);
                }
                else{
                    toast.error(res.data.message, {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                     })  
                }
            }).catch(err => {
                console.log("err" ,err);
                toast.error("User does not exist", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                 })  
            })
        }
        else{
            toast.error("Please enter userID", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             })  
        }
     }
    return (
        <div>
             <button className="btn"  onClick={handleShow}>
              <AddCircleOutlineIcon/>
            </button>

            <Dialog 
            open={show} 
            fullScreen={fullScreen}
            maxWidth="xl"
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">Connect with Users to chat </DialogTitle>
                <DialogContent>
                    <form>
                        <div className="form-group" >
                        <label>Enter UserID</label>
                          <input 
                          value={userId} 
                          className="form-control"
                          onChange={e => setuserId(e.target.value)} 
                          type="text" 
                          placeholder="User ID" />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="info" onClick={handleConnect}>
                   Connect
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddUserModal
