import http from 'k6/http';
import { URLS } from "../config/urls.js";
import { HEADERS } from "../config/constants.js";


export function postTestimonial( token , payload) {
    
    const url = URLS.testimonials;
    const testimonialBody = JSON.stringify(payload);
    const headers = {
        ...HEADERS.JSON,
        'Authorization': `Bearer ${token}`,
    };
    return http.post(url, testimonialBody, { headers });

}

export function getMyTestimonials(token) {

    const url = URLS.myTestimonials;
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'                      
    };
    return http.get(url, { headers });
}

export function putTestimonial(token, testimonialId, payload) {

    const testimonialRequestPayload = JSON.stringify(payload);
    const url = `${URLS.testimonials}/${testimonialId}`;
    const headers = {
        ...HEADERS.JSON,
        'Authorization': `Bearer ${token}`,
    };
    const body = JSON.stringify(payload);
    return http.put(url, body, { headers });
}

export function deleteTestimonial(token, testimonialId) {
   
    const url = `${URLS.testimonials}/${testimonialId}`;
    const headers = {
        ...HEADERS.JSON,
        'Authorization': `Bearer ${token}`,
    };
    return http.del(url, null, { headers });
};