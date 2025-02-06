# Upraised-Assignment Task Backend

This is the backend implementation showcasing my skills in restfull api using nodejs. The submitted data is stored in a postgresql database and can be viewed by administrators via a dashboard.

---

## Directory Structure

```
project/
├── prisma/
│   ├── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── gadgetController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   ├── routes/
│   │   ├── authRoute.ts
│   │   ├── gadgetRoutes.ts
│   ├── services/
│   │   ├── gadgetService.ts
│   ├── types/
│   │   ├── express.d.ts
│   ├── utils/
│   │   ├── auth.ts
│   │ 
│   ├── prisma.ts
│   ├── server.ts
│
├── .env
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
```

---


## Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL** (with Prisma)
- **JSON Web Tokens (JWT)** (for admin authentication)
- **Cookies** (for storing token)

---

## Setup Instructions


### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   DATABASE_URL=<your_postgreSql_database_uri>
   JWT_SECRET=<your_jwt_secret>
   ```
   
4.  Run Migrations (Prisma):
   ```bash
   npx prisma migrate dev
   ```

5. Start the server:
   ```bash
   npm run dev
   ```
   The backend will be available at `http://localhost:3000`.

---

## API Endpoints

### ### Fetch All gadgets

#### GET `/api/gadgets`
Fetch all the gadgets with success probability generated randomly to each gadget


- **Response:**
  ```json
  [
    {
    "id": "<user_id>",
    "name": "<name>",
    "status":"<status>",
    "decommissionedAt": "<date>",
    "missionSuccessProbability": "<randomSuccess>"
    },
    ...
    ]
  ```

### create gadget

#### POST `/api/gadgets`
Create a gadget.

- **Request Body:**
  ```json
  {

  }
  ```

- **Response:**
  ```json
    {
        "id": "<id>",
        "name": "<name>",
        "status": "<status>",
        "decommissionedAt": null
    }
  ```
### Update gadget

#### PATCH `/api/gadgets/:id`
Create a gadget.

- **Request Body:**
  ```json
  {
    "name": "<name>",
    "status": "<status>",
  }
  ```

- **Response:**
  ```json
    {
        "id": "<id>",
        "name": "<name>",
        "status": "<status>",
        "decommissionedAt": null
    }
  ```
### Delete gadget (decommosion)

#### DELETE `/api/gadgets/:id`
Create a gadget.

- **Request Body:**
  ```json
  {

  }
  ```

- **Response:**
  ```json
    {
        "id": "<id>",
        "name": "<name>",
        "status": "decommossined",
        "decommissionedAt": "<dateTime>"
    }
  ```
### Self-destruct gadget

#### POST `/api/gadgets/:id/self-destruct`
Create a gadget.

- **Request Body:**
  ```json
  {

  }
  ```

- **Response:**
  ```json
    {
        "confirmationCode": "<code>"
    }
  ```

### User Authentication

#### POST `/api/auth/signup`
create user

- **Request Body:**
  ```json
  {
    "email": "<email>",
    "password": "<password>"
  }
  ```

- **Response:**
  ```json
    {
        "user": {
            "id": "<id>",
            "email": "<email>",
            "password": "<hashedPassword>",
            "createdAt": "<createdAt>",
            "updatedAt": "<updatedAt>"
        },
    }
  ```

#### POST `/api/auth/login`
Authenticate user using credentials.

- **Request Body:**
  ```json
  {
    "email": "<email>",
    "password": "<password>"
  }
  ```

- **Response:**
  ```json
    {
        "user": {
            "id": "<id>",
            "email": "<email>",
            "password": "<hashedPassword>",
            "createdAt": "<createdAt>",
            "updatedAt": "<updatedAt>"
        },
        "token": "<token>"
    }
  ```

  #### POST `/api/auth/logout`

- **Response:**
  ```json
  {
    "message": "Logged Out Successfully"
  }
  ```

---

## Running Tests

You can use tools like **Postman** or **cURL** to test the endpoints.

**Postman Link** -  `https://assignment-7873.postman.co/workspace/Assignment-Workspace~b4804b6c-c9aa-4dc8-9ecc-51d60bf895cc/collection/35181588-b49e3b3e-1cc8-455b-8d6b-908b2eda02f0?action=share&creator=35181588`

---


## Deployed Links

**Backend Url** -  ``

---
