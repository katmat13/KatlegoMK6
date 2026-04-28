import { check } from "k6";

export function validateLoginResponse(response) {
    check(response, {
        "status is 200": (res) => res.status === 200,
        "Body is not empty": (res) => res.body.length > 0
    });
}

export function validateProfileResponse(response) {
    check(response, {
        "status is 200": (res) => res.status === 200,
        "Body is not empty": (res) => res.body.length > 0
    });
}
export function validateTestimonialResponse(testimonialResponse) {
    check(testimonialResponse, {
        "status is 200": (res) => res.status > 199 && res.status < 300,
        "Body is not empty": (res) => res.body.length > 0
    });
}
