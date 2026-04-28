import http from 'k6/http';
import { URLS } from "../config/urls.js";
import { HEADERS } from "../config/constants.js";

export function getProfile(token) {
    const url = URLS.profile; 
    const headers = {
        ...HEADERS.JSON,
        'Authorization': `Bearer ${token}`
    }
    return http.get(url, { headers })
};
