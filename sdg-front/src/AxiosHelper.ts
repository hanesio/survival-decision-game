import axios from 'axios';
import { AxiosResponse } from 'axios';
// Dev URL
const URL = 'http://localhost:8800/api/';

export class AxiosHelper {
    constructor() {
        this.setHeaders();
    }

    /**
     * Headers
     */
    setHeaders() {
        // axios.defaults.withCredentials = true;
        axios.defaults.headers.post = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
    }

    /**
     *
     * @param {*} route
     */
    async get(route: string, params?: Object): Promise<AxiosResponse<any, any>> {
        return axios
            .get(`${URL}${route}`, { params: params })
            .then((response) => {
                return response;
            })
            .catch((e) => {
                console.log(e.response);
                return e.response;
            });
    }

    /**
     *
     * @param {*} route
     * @param {*} data
     */
    async post(route: string, data: any): Promise<AxiosResponse<any, any>> {
        return axios
            .post(`${URL}${route}`, data)
            .then((response) => {
                return response;
            })
            .catch((e) => {
                console.log(e.response);
                return e.response;
            });
    }

    /**
     *
     * @param {*} route
     * @param {*} data
     * @returns
     */
    async put(route: string, data: any): Promise<AxiosResponse<any, any>> {
        return axios
            .put(`${URL}${route}`, data)
            .then((response) => {
                return response;
            })
            .catch((e) => {
                console.log(e.response);
                return e.response;
            });
    }
}
