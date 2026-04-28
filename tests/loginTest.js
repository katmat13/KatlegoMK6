import http from 'k6/http';
import { TEST_CONFIG } from "../config/constants.js";
import { PAYLOADS } from "../data/payloads.js";
import { loginRequest } from "../requests/loginRequest.js";
import { validateLoginResponse } from "../validator/authValidator.js";
import { sleep } from 'k6';
import { HEADERS } from "../config/constants.js";

export const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration
};

export default function loginTest() {
    const response = loginRequest(PAYLOADS.login);
    const body = response.json();
    console.log(`Response status: ${response.status}`);
    console.log(`Response body: ${response.body}`);
    validateLoginResponse(response);
    sleep (TEST_CONFIG.sleepTime, TEST_CONFIG.vus);


    // Check for rate limit error and retry if necessary
    if (body.error_code === 'RATE_LIMIT_EXCEEDED') {
    console.warn('Rate limit hit, retrying after 5s...');
    sleep(5);
   // return response;
}}