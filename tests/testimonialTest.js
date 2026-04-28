import { sleep } from "k6";
import http from 'k6/http';
import { getProfile } from "../requests/profileRequest.js";
import { loginRequest } from "../requests/loginRequest.js";
import { TEST_CONFIG } from "../config/constants.js";
import { validateLoginResponse } from "../validator/authValidator.js";
import { validateProfileResponse } from "../validator/authValidator.js";
import { validateTestimonialResponse } from "../validator/authValidator.js";
import { PAYLOADS } from "../data/payloads.js";
import { postTestimonial } from "../requests/testimonialRequest.js";
import { getMyTestimonials } from "../requests/testimonialRequest.js";
import { putTestimonial } from "../requests/testimonialRequest.js";
import { deleteTestimonial } from "../requests/testimonialRequest.js";  
import profileTest from "./profileTest.js";
import loginTest from "./loginTest.js";
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { check } from "k6";



export const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration
};

export default function testimonialTest() {

    const loginRequestPayload = loginRequest(PAYLOADS.login);
    validateLoginResponse(loginRequestPayload);
    const body = loginRequestPayload.json();
    const token = body.data.token; 
   
    //log in to get the token
    console.log("Logging in to get the token...");
    loginTest();

    //get profile using the token
    console.log("Getting profile using the token...");
    profileTest();  
    

    //post testimonial using the token
    console.log("Posting testimonial using the token...");
    const testimonialResponse = postTestimonial(token, PAYLOADS.postTestimonial);
    validateTestimonialResponse(testimonialResponse);
    console.log(`Response status: ${testimonialResponse.status}`);
    console.log(`Response body: ${testimonialResponse.body}`);
    

     //  Parse the JSON body
    const json = JSON.parse(testimonialResponse.body);

    //  Access the testimonial ID
    const testimonialId = json.data.Id;
    console.log(`CREATED Testimonial ID: ${testimonialId}`);

    //get testimonial using the token
    //console.log("Getting my testimonials using the token...");
    /**const getMyTestimonialsResponse = getMyTestimonials(token);
    console.log(`Response status: ${getMyTestimonialsResponse.status}`);
    console.log(`Response body: ${getMyTestimonialsResponse.body}`);
    validateTestimonialResponse(getMyTestimonialsResponse);*/

    //update testimonial using the token
    console.log("Updating testimonial using the token and testimonial ID...");
    const updateTestimonialResponse = putTestimonial(token, testimonialId, PAYLOADS.putTestimonial);
    validateTestimonialResponse(updateTestimonialResponse)
    console.log(`Response status: ${updateTestimonialResponse.status}`);
    console.log(`Response body: ${updateTestimonialResponse.body}`);
    
    console.log(`UPDATED Testimonial ID: ${testimonialId}`);

    //delete testimonial using the token
    console.log("Deleting testimonial using the token and testimonial ID...");
    const deleteTestimonialResponse = deleteTestimonial(token, testimonialId);
    console.log(`Response status: ${deleteTestimonialResponse.status}`);
    console.log(`Response body: ${deleteTestimonialResponse.body}`);
    validateTestimonialResponse(deleteTestimonialResponse);
    console.log(`DELETED Testimonial ID: ${testimonialId}`);
    console.log("~~~~~~~~~~~~~~~~~~~~Testimonial test completed.~~~~~~~~~~~~~~~~~~~~");

}
// Generate HTML report after the test run and save it in the report folder.
export function handleSummary(data) {
  
  return {
    'reports/Summary Test Report.html': htmlReport(data),
  };
}
  






