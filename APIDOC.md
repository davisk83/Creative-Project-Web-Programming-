# Presidential Campaign API Documentation
The presidential campaign API provides information about the president's profile and his greeting
message.

## President's Greeting Message
**Request Format:** /action/:action

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Return a greeting message.

**Example Request:** /action/greet

**Example Response:**

```
Hello, VOTE FOR ME NOW!
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If passed in an invalid action type (not "greet"), returns an error with the message: Incorrect action types!

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
