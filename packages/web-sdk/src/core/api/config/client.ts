import { create } from 'apisauce';

import { CONFIG } from '../../constants/index.js';

import { axios } from './axios.js';

export const client = create({ axiosInstance: axios, baseURL: CONFIG.apiURL });
