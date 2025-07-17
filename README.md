# Coding Challenge: Interactive Document Classifier Dashboard

The design was made from the example UI.
Time spent:4-4.5h

Possible additions: normalize the scores to equal 1, add undo functionality, implement pagination on the GET endpoint, store edited badge in backend rather than in local state
## Tech Stack

### React + Typescript for UI
### Java Spring Boot for backend
### PostgreSQL for storing data


## Main functionalities

### POST endpoint for adding classification data
#### Running currently on [http://localhost:8080/api/classifications](http://localhost:8080/api/classifications)

### GET endpoint for displaying classifications
#### Running currently on [http://localhost:8080/api/classifications](http://localhost:8080/api/classifications)

### PATCH endpoint for updating classification(PATCH /classifications/:id).
#### Running currently on [http://localhost:8080/api/classifications/{id}](http://localhost:8080/api/classifications/{id})

## How to Run

```bash

# 1. Clone the Repository
git clone https://github.com/EnarL/DocumentClassifierDashboard.git
```

```bash
# 2. Move to backend directory
Run BackendApplication
```
```bash

# 3. Create database
Run PgAdmin and create database called "Documents" or use psql and insert CREATE DATABASE documents
```
```bash
# 4. Move to frontend  directory
npm run start
```
#### Backend is running at: http://localhost:8080
#### Frontend is running at: http://localhost:3000


