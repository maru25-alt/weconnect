import {ToastContainer} from 'react-toastify';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { SignedOutRoutes} from './routes/ProtectedRoutes'
import Home from './pages/Home';
import Signin from './pages/Signin';
import {selectUser} from './store/slices/userSlice';
import { useSelector} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = useSelector(selectUser);
  return (
    <div className="app">
      <Router>
         <ToastContainer/>
         <Switch>
            {user ? 
               <Route 
               path="/" 
               render={props => <Home {...props}/>}/> 
               :  
              <SignedOutRoutes 
               isAuth={user}  
               component={Signin} 
               path='/signin'
              />  
              }
            <Redirect path="*" to='/signin'></Redirect>
         </Switch>
      </Router>
    </div>
  );
}

export default App;
