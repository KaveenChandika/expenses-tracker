import axios from 'axios';

const instance  = axios.create({
    baseURL:"https://expenses2-tracker.herokuapp.com"
});

export default instance;