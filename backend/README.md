# DBT Student Portal Backend

A FastAPI-based backend service for the DBT Student Portal that provides personalized scholarship recommendations and PDF report generation.

## Features

- **Scholarship Recommendation Engine**: AI-powered matching based on student profiles
- **PDF Report Generation**: Comprehensive scholarship reports with eligibility analysis
- **Student Profile Management**: Validation and management of student data
- **Multi-language Support**: API responses support English, Hindi, and Tamil
- **Real-time Analytics**: Dashboard analytics and statistics

## API Endpoints

### Core Endpoints

- `GET /` - API health check and version info
- `POST /api/scholarships/recommendations` - Get personalized scholarship recommendations
- `POST /api/pdf/generate-recommendations` - Generate PDF report for recommendations
- `GET /api/pdf/sample` - Generate sample PDF for testing

### Data Endpoints

- `GET /api/scholarships/all` - Get all available scholarships
- `GET /api/scholarships/{scholarship_id}` - Get specific scholarship details
- `POST /api/student/profile/validate` - Validate student profile data
- `GET /api/analytics/dashboard` - Get dashboard analytics

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Setup

1. **Clone or navigate to the backend directory**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

3. **Start the server**
   
   **Linux/Mac:**
   \`\`\`bash
   chmod +x start_server.sh
   ./start_server.sh
   \`\`\`
   
   **Windows:**
   \`\`\`cmd
   start_server.bat
   \`\`\`
   
   **Manual start:**
   \`\`\`bash
   python main.py
   \`\`\`

4. **Access the API**
   - API Server: http://localhost:8000
   - Interactive Documentation: http://localhost:8000/docs
   - Alternative Documentation: http://localhost:8000/redoc

## Configuration

### CORS Settings

The API is configured to accept requests from:
- `http://localhost:3000` (React development server)
- `http://127.0.0.1:3000`

To add more origins, modify the `allow_origins` list in `main.py`.

### Database

Currently uses in-memory mock data for scholarships. In production, this should be replaced with a proper database connection.

## API Usage Examples

### Get Scholarship Recommendations

\`\`\`python
import requests

# Student profile data
student_data = {
    "student_profile": {
        "name": "John Doe",
        "email": "john@example.com",
        "cgpa": 8.5,
        "category": "General",
        "family_income": 400000,
        "course": "Computer Science Engineering",
        "dbt_status": "Active",
        # ... other required fields
    }
}

# Get recommendations
response = requests.post(
    "http://localhost:8000/api/scholarships/recommendations",
    json=student_data
)

recommendations = response.json()
\`\`\`

### Generate PDF Report

\`\`\`python
import requests

# Generate PDF report
pdf_data = {
    "student_profile": student_profile_dict,
    "recommendations": recommendations_list
}

response = requests.post(
    "http://localhost:8000/api/pdf/generate-recommendations",
    json=pdf_data
)

# Save PDF file
with open("scholarship_report.pdf", "wb") as f:
    f.write(response.content)
\`\`\`

## Scholarship Matching Algorithm

The recommendation engine uses a weighted scoring system:

- **CGPA Score (30%)**: Based on minimum CGPA requirements
- **Income Score (25%)**: Based on family income eligibility
- **Category Match (20%)**: Matches student category with scholarship requirements
- **Gender Match (10%)**: For gender-specific scholarships
- **Course Match (10%)**: For course-specific scholarships
- **Disability Support (15%)**: Additional points for disability scholarships
- **DBT Requirement**: Mandatory - disqualifies if DBT not active

## PDF Report Features

Generated PDF reports include:

- **Student Information**: Complete profile summary
- **Scholarship Recommendations**: Ranked by eligibility score
- **Match Analysis**: Detailed reasons for each recommendation
- **Requirements Checklist**: What's needed to apply
- **Application Links**: Direct links to scholarship portals
- **Important Notes**: DBT requirements and application tips

## Development

### Adding New Scholarships

Add scholarship data to the `SCHOLARSHIPS_DB` list in `main.py`:

\`\`\`python
{
    "scholarship_id": "SCH006",
    "name": "New Scholarship Name",
    "provider": "Provider Organization",
    "amount": 75000,
    "deadline": "2024-07-31",
    "application_link": "https://example.com/apply",
    "requirements": ["Requirement 1", "Requirement 2"],
    "category": "Category Type",
    "eligibility_criteria": {
        "min_cgpa": 7.0,
        "max_income": 500000,
        "categories": ["General", "OBC"],
        "dbt_required": True
    }
}
\`\`\`

### Customizing PDF Templates

Modify the `pdf_generator.py` file to customize:
- Report layout and styling
- Additional sections or data
- Branding and colors
- Font styles and sizes

## Troubleshooting

### Common Issues

1. **Port 8000 already in use**
   \`\`\`bash
   # Kill process using port 8000
   lsof -ti:8000 | xargs kill -9
   \`\`\`

2. **CORS errors from frontend**
   - Ensure frontend is running on http://localhost:3000
   - Check CORS configuration in `main.py`

3. **PDF generation errors**
   - Ensure reportlab is properly installed
   - Check file permissions for PDF output

4. **Import errors**
   \`\`\`bash
   # Reinstall dependencies
   pip install -r requirements.txt --force-reinstall
   \`\`\`

## Production Deployment

For production deployment:

1. **Use a production ASGI server**
   \`\`\`bash
   pip install gunicorn
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
   \`\`\`

2. **Set up environment variables**
   - Database connection strings
   - API keys for external services
   - CORS origins for production domains

3. **Configure reverse proxy** (nginx/Apache)
4. **Set up SSL certificates**
5. **Configure logging and monitoring**

## License

This project is part of the DBT Student Portal system.
