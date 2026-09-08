---
name: api-design
description: RESTful route handler design, Server Actions, payload validation, status codes, error envelopes, and rate limiting.
---

# API Design & Server Endpoints

## 1. Route Handlers & Server Actions Structure
- Use Route Handlers (`src/app/api/...`) for public/webhook integration endpoints.
- Use Server Actions for first-party UI form submissions and data mutations.

## 2. Standardized Response Envelope
All API endpoints must return a predictable structure:

```typescript
// Success Response
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VEHICLE_UNAVAILABLE",
    "message": "The selected vehicle is no longer available for the chosen dates.",
    "details": []
  }
}
```

## 3. HTTP Status Codes
- `200 OK`: Successful retrieval or standard mutation.
- `201 Created`: Resource successfully created (e.g., booking created).
- `400 Bad Request`: Validation failure (malformed payload).
- `401 Unauthorized`: Missing or invalid authentication token.
- `403 Forbidden`: Authenticated user lacks permission (e.g., non-admin accessing admin records).
- `404 Not Found`: Resource does not exist.
- `409 Conflict`: Business state collision (e.g. double booking / date overlap).
- `422 Unprocessable Entity`: Semantic domain constraint failure.
- `429 Too Many Requests`: Rate limit reached.
- `500 Internal Server Error`: Unexpected internal error.

## 4. Server-Side Validation Rules
- **Never trust client inputs**: Prices, vehicle availability, discount codes, user IDs, and permissions MUST be computed and validated on the server.
- Validate all incoming payloads with Zod before processing.
