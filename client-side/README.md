# CVizard Angular Frontend

## Features
- User Authentication (Login/Register)
- Resume Upload (PDF/DOCX)
- Job Description Management
- AI-Powered Resume Analysis
- Dashboard with Analytics

## API Integration
- Base URL: https://localhost:7174/api
- JWT Authentication
- File Upload Support
- Real-time Analysis

## Components
- **Auth**: Login/Register with JWT
- **Dashboard**: Main navigation hub
- **Resume**: Upload and manage resumes
- **Job Description**: Create and manage job descriptions
- **Analysis**: AI-powered resume analysis

## Services
- **AuthService**: Authentication management
- **ResumeService**: Resume operations
- **JobDescriptionService**: Job description CRUD
- **AnalysisService**: AI analysis integration

## Getting Started
1. Ensure the .NET API is running on https://localhost:7174
2. Run `ng serve` to start the development server
3. Navigate to http://localhost:4200
4. Register a new account or login
5. Upload resumes and create job descriptions
6. Analyze resumes against job descriptions

## Routes
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard
- `/upload-resume` - Resume upload
- `/create-job` - Job description creation
- `/analyze` - Resume analysis