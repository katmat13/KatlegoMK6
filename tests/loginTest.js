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
    console.log(`Response status: ${response.status}`);
    console.log(`Response body: ${response.body}`);
    validateLoginResponse(response);
    sleep (TEST_CONFIG.sleepTime, TEST_CONFIG.vus);
   // return response;
}