import axios from 'axios';
import Config from '../config.js';

const api = axios.create({
    baseURL: Config.baseURL
});

export default api;