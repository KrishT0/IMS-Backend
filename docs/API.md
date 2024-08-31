# API Documentation

## Base URL

```
https://api/
```

## Authentication Endpoints

**Endpoint :** `/auth/verify-mobile`<br>
**Method :** `POST`<br>
**Description :** Verify mobile number<br>
**Request body :**

```json
{
  "mobile": "string"
}
```

**Response :**<br>

```json
[
  {
    "_id": "string",
    "mobile": "string",
    "name": "string",
    "department": "string",
    "role": "string",
    "intern": "string[]",
    "mentor": "string"
  }
]
```
