import { create } from 'apisauce';

import { CONFIG } from '../../constants';

import { axios } from './axios';

export const client = create({ axiosInstance: axios, baseURL: CONFIG.apiURL });
