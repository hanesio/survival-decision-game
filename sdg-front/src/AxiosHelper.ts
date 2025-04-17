import axios from 'axios';
import { AxiosResponse } from 'axios';
// Dev myURL
const hostname = window.location.hostname; // z.B.localhost
// const myURL = 'http://' + hostname + ':5000/api/';
// const myURL = 'http://192.168.178.24:5000/api/';

// Production myURL
const myURL = '/api/';

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
            .get(`${myURL}${route}`, { params: params })
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
            .post(`${myURL}${route}`, data)
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
            .put(`${myURL}${route}`, data)
            .then((response) => {
                return response;
            })
            .catch((e) => {
                console.log(e.response);
                return e.response;
            });
    }
}
