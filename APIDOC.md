# Presidential Campaign API Documentation
The presidential campaign API provides information about the president's profile and his greeting
message.

## President's Greeting Message
**Request Format:** /greet

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Return a greeting message.

**Example Request:** /greet

**Example Response:**

```
Hello, VOTE FOR ME NOW!
```

**Error Handling:** Possible 400 (invalid request) errors (all plain text)

## President's Profile
**Request Format:** /profile

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Return a JSON of a basic profile.


**Example Request:** /profile

**Example Response:**

```
{
  "name": "Davis Kurniawan",
  "age": "27",
  "nationality": "Mexican"
}
```

**Error Handling:**
N/A
