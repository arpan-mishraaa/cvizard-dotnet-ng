# CVizard - AI-Powered Resume Analysis Tool

CVizard is a modern web application that uses AI to analyze resumes against job descriptions, providing ATS scores, detailed feedback, and LaTeX code generation for optimized resumes.

## Features

- 🤖 **AI-Powered Analysis** - Advanced resume analysis using Google Gemini AI
- 📊 **ATS Scoring** - Get instant ATS compatibility scores
- 💡 **Smart Recommendations** - Personalized suggestions for improvement
- 📄 **LaTeX Generation** - Generate professional LaTeX resume templates
- 🔐 **User Authentication** - Secure login and registration system
- 📱 **Responsive Design** - Modern, mobile-friendly interface

## Tech Stack

### Frontend
- **Angular 18** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Custom styling with animations
- **RxJS** - Reactive programming

### Backend
- **.NET 8** - Cross-platform web API
- **Entity Framework Core** - ORM for database operations
- **MySQL** - Database storage
- **Google Gemini AI** - AI analysis engine
- **JWT Authentication** - Secure token-based auth

## Getting Started

### Prerequisites
- Node.js 18+
- .NET 8 SDK
- MySQL Server
- Google Gemini API Key

### Frontend Setup
```bash
cd client-side
npm install
ng serve
```

### Backend Setup
```bash
cd Server_Side
dotnet restore
dotnet run
```

### Configuration
1. Create `appsettings.json` in Server_Side:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "your-mysql-connection-string"
  },
  "Gemini": {
    "ApiKey": "your-gemini-api-key"
  },
  "Jwt": {
    "Key": "your-jwt-secret-key",
    "Issuer": "CVizard",
    "Audience": "CVizard-Users"
  }
}
```

## API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/resumes/{userId}` - Upload resume
- `GET /api/resumes/{userId}` - Get user resumes
- `POST /api/jobdescriptions/{userId}` - Create job description
- `GET /api/jobdescriptions/{userId}` - Get user job descriptions
- `POST /api/analysis/analyze` - Analyze resume
- `POST /api/analysis/latex` - Generate LaTeX code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.