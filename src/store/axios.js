import axios from 'axios';
import  dotenv from 'dotenv';

dotenv.config()
//const Base_url = "http://localhost:5000/api";
const API_url = "https://weconnect-messaging.herokuapp.com/api"

const instance = axios.create({
    baseURL: API_url
})


export default instance