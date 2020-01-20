import axios from 'axios';
import Config from '../Config';

const api = axios.create({
    baseURL: Config.baseURL
});

export default api;