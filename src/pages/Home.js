import React, { useEffect } from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import Chat from '../components/Chat';
import DefaultView from '../components/DefaultView';
import Sidebar from '../components/Sidebar';
import { selectUser } from '../store/slices/userSlice';
import { useSelector} from 'react-redux';

function Home(history) {
   const user = useSelector(selectUser)
    useEffect(() => {
        if(!user){
            history.push('/signin')
        }
    }, [user, history])
    return (
        <div className="chat__container">
            <Sidebar/>
               <Switch>
                  <Route 
                   path="/:id" 
                   component={Chat}/>
                    <Route 
                    component={DefaultView} 
                    path="/"  />  
                 <Redirect path="*" to="/"/>
                </Switch>
        </div>
    )
}

export default Home
