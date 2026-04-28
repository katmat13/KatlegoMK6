import { check } from "k6";

export function validateLoginResponse(response) {
    check(response, {
        "LOGIN status is OK": (res) => res.status === 200,
        "Body is not empty": (res) => res.body.length > 0
    });
}

export function validateProfileResponse(response) {
    check(response, {
        "PROFILE status is OK": (res) => res.status === 200,
        "Body is not empty": (res) => res.body.length > 0
    });
}
export function validateTestimonialResponse(response) {
    check(response, {
        "TESTIMONIAL status is OK": (res) => res.status > 199 && res.status < 300,
        "Body is not empty": (res) => res.body.length > 0
    });
}
