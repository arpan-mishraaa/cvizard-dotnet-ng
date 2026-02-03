# CVizard API Documentation

## Base URL
`https://localhost:7000/api` (Development)

## Authentication
All endpoints except `/users/register` and `/users/login` require JWT Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Users Controller

#### Register User
- **POST** `/users/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```
- **Response:**
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

#### Login User
- **POST** `/users/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "jwt-token-here",
  "email": "user@example.com",
  "userId": 1
}
```

### Resumes Controller

#### Upload Resume
- **POST** `/resumes/{userId}`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `file`: PDF or DOCX file
  - `metadata`: Optional string
- **Response:**
```json
{
  "id": 1,
  "message": "Resume uploaded successfully",
  "parsedText": "extracted text content"
}
```

#### Get User Resumes
- **GET** `/resumes/{userId}`
- **Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "fileName": "resume.pdf",
    "parsedText": "extracted text",
    "metadata": "optional metadata",
    "uploadedAt": "2024-01-01T00:00:00Z"
  }
]
```

### Job Descriptions Controller

#### Create Job Description
- **POST** `/jobdescriptions/{userId}`
- **Body:**
```json
{
  "title": "Software Engineer",
  "text": "Job description content here..."
}
```
- **Response:**
```json
{
  "id": 1,
  "message": "Job description created successfully"
}
```

#### Get User Job Descriptions
- **GET** `/jobdescriptions/{userId}`
- **Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Software Engineer",
    "text": "Job description content",
    "uploadedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Job Description by ID
- **GET** `/jobdescriptions/details/{id}`
- **Response:**
```json
{
  "id": 1,
  "userId": 1,
  "title": "Software Engineer",
  "text": "Job description content",
  "uploadedAt": "2024-01-01T00:00:00Z"
}
```

### Analysis Controller

#### Analyze Resume
- **POST** `/analysis/analyze`
- **Body:**
```json
{
  "resumeId": 1,
  "jobDescriptionId": 1,
  "resumeText": "resume content",
  "jobDescription": "job description content"
}
```
- **Response:**
```json
{
  "analysisId": 1,
  "result": "AI analysis result from Gemini"
}
```

#### Get User Analyses
- **GET** `/analysis/{userId}`
- **Response:**
```json
[
  {
    "id": 1,
    "resumeId": 1,
    "jobDescriptionId": 1,
    "atsScore": 85.5,
    "suggestionsJson": null,
    "aiResponseJson": "AI response",
    "createdAt": "2024-01-01T00:00:00Z",
    "resumeFileName": "resume.pdf",
    "jobTitle": "Software Engineer"
  }
]
```

#### Get Analysis by ID
- **GET** `/analysis/details/{id}`
- **Response:**
```json
{
  "id": 1,
  "resumeId": 1,
  "jobDescriptionId": 1,
  "atsScore": 85.5,
  "suggestionsJson": null,
  "aiResponseJson": "AI response",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### LaTeX Outputs Controller

#### Create LaTeX Output
- **POST** `/latexoutputs`
- **Body:**
```json
{
  "analysisId": 1,
  "latexText": "LaTeX content here",
  "pdfPath": "/path/to/generated.pdf"
}
```
- **Response:**
```json
{
  "id": 1,
  "message": "LaTeX output created successfully"
}
```

#### Get LaTeX Outputs by Analysis
- **GET** `/latexoutputs/analysis/{analysisId}`
- **Response:**
```json
[
  {
    "id": 1,
    "analysisId": 1,
    "latexText": "LaTeX content",
    "pdfPath": "/path/to/generated.pdf",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Get LaTeX Output by ID
- **GET** `/latexoutputs/{id}`
- **Response:**
```json
{
  "id": 1,
  "analysisId": 1,
  "latexText": "LaTeX content",
  "pdfPath": "/path/to/generated.pdf",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Error Responses
All endpoints return error responses in this format:
```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

## Database Schema
The API uses the following MySQL tables:
- `Users`: User authentication data
- `Resumes`: Uploaded resume files and parsed text
- `JobDescriptions`: Job description data
- `Analyses`: Resume analysis results
- `LatexOutputs`: Generated LaTeX and PDF outputs