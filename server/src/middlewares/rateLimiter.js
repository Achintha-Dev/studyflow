import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
    // windowMs: 15 * 60* 1000, // 15 minutes
    // limit: 100, // Limit each IP to 100 requests per window
    
    windowMs:1 * 60* 100, // 1 minutes for testing.
    limit: 5, // Limit each IP to 5 requests per window
    message: {
        message: "Too many requests! Please try again later."
    },
    standardHeaders: 'draft-7', // Draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});