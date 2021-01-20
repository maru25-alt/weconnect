import React from 'react';
import {Route , Redirect} from 'react-router-dom'

export const SignedInRoutes = ({component: Component, path,  isAuth, exact}) => {
    if(!isAuth) {
        return <Redirect to="/signin"/>
    }
    return <Route exact={exact} path={path} render={props => <Component {...props}/>}/> 
}

export const SignedOutRoutes = ({component, path,  isAuth, exact}) => {
    if(isAuth) {
        return <Redirect to="/"/>
    }
    return <Route path={path} component={component}/>
}