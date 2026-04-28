import { sleep } from "k6";
import { getProfile } from "../requests/profileRequest.js";
import { loginRequest } from "../requests/loginRequest.js";
import { TEST_CONFIG } from "../config/constants.js";
import { validateLoginResponse } from "../validator/authValidator.js";
import { validateProfileResponse } from "../validator/authValidator.js";
import { PAYLOADS } from "../data/payloads.js";

export const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration
};

export default function profileTest() {
    const loginRequestPayload = loginRequest(PAYLOADS.login);
    validateLoginResponse(loginRequestPayload);

    const body = loginRequestPayload.json();
    const token = body.data.token;

    const response = getProfile(token); 
    console.log(`Response status: ${response.status}`);
    console.log(`Response body: ${response.body}`);
    validateProfileResponse(response);
};