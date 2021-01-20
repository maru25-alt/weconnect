import React, {useState} from 'react'
import {  toast } from 'react-toastify';
import { useDispatch} from 'react-redux';
import {loggin}  from '../store/slices/userSlice';
import  {LoginString} from '../store/LocalStorage'
import { useForm } from "react-hook-form";
import axios from '../store/axios'

function Signin({history}) {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
 
    const handleSignin = () => {
      setLoading(true)
      axios.post('/users/signin', {password, username})
      .then(res => {
          if(res.data.success){
              //you are loggedni
              dispatch(loggin({
                  username: res.data.user?.username,
                  id: res.data.user?._id
              }))
              toast.success("Your are logged in", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
              localStorage.setItem(LoginString.ID, res.data.user?._id);
              localStorage.setItem(LoginString.USERNAME, res.data.user?.username);
              history.push('/')
          }
          else{
              //err
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
          setLoading(false)
      })
      .catch(err => {
          console.log(err);
          setLoading(false)
      })

    }

    const handleSignup = () => { 
        
        if(!password || !username){
            toast.error("Please fill in all the fields", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        else{
            axios.post('/users/signup', {password, username})
            .then(res => {
                if(res.data.success){
                    dispatch(loggin({
                        username: res.data.user?.username,
                        id: res.data.user?._id
                    }))
                    localStorage.setItem(LoginString.ID, res.data.user?._id);
                    localStorage.setItem(LoginString.USERNAME, res.data.user?.username);
                    history.push('/')
                    toast.success("Your are logged in", {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
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
            })
        }
    }

    return (
        <div className="signin__page">
            <h1>Signin Account</h1>
           <form action="">
                <div className="mb-3 row">
                     <label for="username" className="col-xs-12 col-sm-2 col-form-label">Username</label>
                    <div className="col-xs-12 col-sm-10 ">
                           <input 
                           type="text" 
                           ref={register({ required: true, minLength: 3})} 
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                           className="form-control" 
                           name="username"/>
                            {errors.username && <div className="text-danger"> Username with at least 3 characters is required</div>}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="password" className="col-xs-12 col-sm-2 col-form-label">Password</label>
                    <div className="col-xs-12 col-sm-10">
                           <input 
                           ref={register({ required: true, minLength: 6})} 
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           type="password" 
                           className="form-control" 
                           name="password"/>
                           {errors.password && <div className="text-danger">Password with at least 6 characters is required</div>}
                    </div>
                </div>
                <div className="mb-4 ">
                    <button 
                    disabled={loading}
                    onClick={handleSubmit(handleSignin)} 
                    className="w-100 btn signin__button " 
                    type="submit">Signin</button>
                </div>
            
                <div className="mb-3 ">
                    <h6 className="text-center">Or Don't have account</h6>
                    <button type="submit" 
                     onClick={handleSubmit(handleSignup)} 
                     className="w-100 btn signup__button"  
                     >Create Account</button>
                </div>
                </form>
          
        </div>
    )
}

export default Signin
