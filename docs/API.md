# API Documentation

## Base URL (Local development)

```
localhost:3000/api/
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
{
  "_id": "string",
  "mobile": "string",
  "name": "string",
  "department": "string",
  "role": "string",
  "intern": "string[]",
  "mentor": "string"
}
```

<br/>

## Admin Endpoints

**Endpoint :** `/admin/get_monthly_report`<br>
**Method :** `POST`<br>
**Description :** Get monthly report<br>
**Request body :**

```json
{
  "month": number
}
```

**Response :**<br>

```json
[
  {
    "name": "string",
    "age": number,
    "mobile": "string",
    "department": "string",
    "project_worked": "string",
    "work_description": "string",
    "feedback": "string",
    "rating": number
  },...
]
```

<br/>

**Endpoint :** `/admin/promote_interns_to_mentor`<br>
**Method :** `POST`<br>
**Description :** Promoting intern to mentor <br>
**Request body :**

```json
{
  "intern_id": "string"
}
```

**Response :**<br>

```json
{
  "message": "string"
}
```

<br/>

## Mentor Endpoints

**Endpoint :** `/mentor/get_interns`<br>
**Method :** `POST`<br>
**Description :** Getting list of interns<br>
**Request body :**

```json
{
  "mentor_id": "string"
}
```

**Response :**<br>

```json
{
  "interns": [
    {
      "_id": "string",
      "name": "string",
      "department": "string"
    }...
  ]
}
```

<br/>

**Endpoint :** `/mentor/feedback_submission`<br>
**Method :** `POST`<br>
**Description :** Submitting feedback of interns<br>
**Request body :**

```json
{
    "mentor_id": "string",
    "intern_id": "string",
    "ratings": "string",
    "feedback": "string",
    "month": number
}
```

**Response :**<br>

```json
{
  "message": "string"
}
```

<br/>

## Intern Endpoints

**Endpoint :** `/intern/get_mentor_for_interns`<br>
**Method :** `POST`<br>
**Description :** Getting list mentor for interns<br>
**Request body :**

```json
{
  "intern_id": "string"
}
```

**Response :**<br>

```json
[
  {
        "_id": "string",
        "name": "string"
    },...
]
```

<br/>

**Endpoint :** `/intern/selecting_mentor`<br>
**Method :** `POST`<br>
**Description :** Selecting mentor for intern<br>
**Request body :**

```json
{
  "intern_id": "string",
  "mentor_id": "string"
}
```

**Response :**<br>

```json
{
  "message": "string"
}
```

<br/>

**Endpoint :** `/intern/uploading_work_details`<br>
**Method :** `POST`<br>
**Description :** Uploading work details completed by intern in a month<br>
**Request body :**

```json
{
    "name": "string",
    "intern_id": "string",
    "month":number,
    "project_worked": "string",
    "work_description": "string",
    "workHours": number
}
```

**Response :**<br>

```json
{
  "message": "string"
}
```
