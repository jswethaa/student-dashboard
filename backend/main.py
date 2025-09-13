from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
from datetime import datetime
import json
from typing import List, Optional
from pydantic import BaseModel

# Import PDF routes
from pdf_routes import pdf_router

# Initialize FastAPI app
app = FastAPI(
    title="DBT Student Portal API",
    description="Backend API for DBT Student Portal with PDF generation capabilities",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include PDF routes
app.include_router(pdf_router, prefix="/api/pdf", tags=["pdf"])

# Pydantic models
class StudentInfo(BaseModel):
    student_id: str
    name: str
    email: str
    phone: str
    course: str
    year: str
    aadhaar_number: str
    bank_account: str
    ifsc_code: str
    dbt_enabled: bool

class ScholarshipApplication(BaseModel):
    student_id: str
    scholarship_id: int
    application_data: dict
    documents: List[str]

class DBTStatus(BaseModel):
    student_id: str
    dbt_enabled: bool
    bank_verified: bool
    aadhaar_linked: bool
    last_updated: str

# Mock data storage (in production, use a database)
students_db = {}
scholarships_db = {}
applications_db = {}

# Sample data
sample_students = [
    {
        "student_id": "STU001",
        "name": "Rajesh Kumar",
        "email": "rajesh.kumar@email.com",
        "phone": "+91-9876543210",
        "course": "Computer Science Engineering",
        "year": "3rd Year",
        "aadhaar_number": "1234-5678-9012",
        "bank_account": "123456789012",
        "ifsc_code": "SBIN0001234",
        "dbt_enabled": True
    },
    {
        "student_id": "STU002",
        "name": "Priya Sharma",
        "email": "priya.sharma@email.com",
        "phone": "+91-9876543211",
        "course": "Electronics Engineering",
        "year": "2nd Year",
        "aadhaar_number": "2345-6789-0123",
        "bank_account": "234567890123",
        "ifsc_code": "HDFC0001234",
        "dbt_enabled": False
    }
]

sample_scholarships = [
    {
        "id": 1,
        "name": "National Merit Scholarship",
        "provider": "Ministry of Education",
        "amount": 50000,
        "deadline": "2024-03-15",
        "eligible": True,
        "category": "merit",
        "description": "For students with academic excellence in 12th grade",
        "requirements": ["Minimum 85% in 12th", "DBT enabled", "Family income < ₹8 lakhs"]
    },
    {
        "id": 2,
        "name": "State Education Grant",
        "provider": "State Government",
        "amount": 25000,
        "deadline": "2024-04-01",
        "eligible": False,
        "category": "need-based",
        "description": "Financial assistance for economically disadvantaged students",
        "requirements": ["Family income < ₹3 lakhs", "DBT enabled", "Domicile certificate"]
    }
]

# Initialize sample data
for student in sample_students:
    students_db[student["student_id"]] = student

for scholarship in sample_scholarships:
    scholarships_db[scholarship["id"]] = scholarship

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "DBT Student Portal API",
        "version": "1.0.0",
        "status": "running",
        "timestamp": datetime.now().isoformat()
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "database": "connected",
            "pdf_generator": "ready"
        }
    }

# Student endpoints
@app.get("/api/students")
async def get_all_students():
    """Get all students"""
    return {"students": list(students_db.values())}

@app.get("/api/students/{student_id}")
async def get_student(student_id: str):
    """Get specific student by ID"""
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"student": students_db[student_id]}

@app.post("/api/students")
async def create_student(student: StudentInfo):
    """Create a new student"""
    students_db[student.student_id] = student.dict()
    return {"message": "Student created successfully", "student_id": student.student_id}

@app.put("/api/students/{student_id}")
async def update_student(student_id: str, student: StudentInfo):
    """Update student information"""
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="Student not found")
    
    students_db[student_id] = student.dict()
    return {"message": "Student updated successfully", "student_id": student_id}

# Scholarship endpoints
@app.get("/api/scholarships")
async def get_all_scholarships():
    """Get all scholarships"""
    return {"scholarships": list(scholarships_db.values())}

@app.get("/api/scholarships/{scholarship_id}")
async def get_scholarship(scholarship_id: int):
    """Get specific scholarship by ID"""
    if scholarship_id not in scholarships_db:
        raise HTTPException(status_code=404, detail="Scholarship not found")
    return {"scholarship": scholarships_db[scholarship_id]}

@app.post("/api/scholarships")
async def create_scholarship(scholarship: dict):
    """Create a new scholarship"""
    scholarship_id = max(scholarships_db.keys()) + 1 if scholarships_db else 1
    scholarship["id"] = scholarship_id
    scholarships_db[scholarship_id] = scholarship
    return {"message": "Scholarship created successfully", "scholarship_id": scholarship_id}

# Application endpoints
@app.post("/api/applications")
async def submit_application(application: ScholarshipApplication):
    """Submit a scholarship application"""
    application_id = f"APP_{len(applications_db) + 1:04d}"
    application_data = {
        "application_id": application_id,
        "student_id": application.student_id,
        "scholarship_id": application.scholarship_id,
        "application_data": application.application_data,
        "documents": application.documents,
        "status": "submitted",
        "submitted_at": datetime.now().isoformat()
    }
    
    applications_db[application_id] = application_data
    return {"message": "Application submitted successfully", "application_id": application_id}

@app.get("/api/applications/{student_id}")
async def get_student_applications(student_id: str):
    """Get all applications for a specific student"""
    student_applications = [
        app for app in applications_db.values() 
        if app["student_id"] == student_id
    ]
    return {"applications": student_applications}

# DBT status endpoints
@app.get("/api/dbt-status/{student_id}")
async def get_dbt_status(student_id: str):
    """Get DBT status for a student"""
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student = students_db[student_id]
    dbt_status = DBTStatus(
        student_id=student_id,
        dbt_enabled=student.get("dbt_enabled", False),
        bank_verified=True,  # Mock data
        aadhaar_linked=True,  # Mock data
        last_updated=datetime.now().isoformat()
    )
    
    return {"dbt_status": dbt_status}

@app.post("/api/dbt-status/{student_id}/enable")
async def enable_dbt(student_id: str):
    """Enable DBT for a student"""
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="Student not found")
    
    students_db[student_id]["dbt_enabled"] = True
    students_db[student_id]["dbt_enabled_at"] = datetime.now().isoformat()
    
    return {"message": "DBT enabled successfully", "student_id": student_id}

# Dashboard data endpoint
@app.get("/api/dashboard/{student_id}")
async def get_dashboard_data(student_id: str):
    """Get comprehensive dashboard data for a student"""
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student = students_db[student_id]
    student_applications = [
        app for app in applications_db.values() 
        if app["student_id"] == student_id
    ]
    
    # Calculate eligible scholarships
    eligible_scholarships = [
        s for s in scholarships_db.values() 
        if s.get("eligible", False)
    ]
    
    total_potential_amount = sum(s.get("amount", 0) for s in eligible_scholarships)
    
    dashboard_data = {
        "student": student,
        "applications": student_applications,
        "eligible_scholarships": eligible_scholarships,
        "total_potential_amount": total_potential_amount,
        "dbt_status": {
            "enabled": student.get("dbt_enabled", False),
            "bank_verified": True,
            "aadhaar_linked": True
        },
        "stats": {
            "total_applications": len(student_applications),
            "eligible_scholarships_count": len(eligible_scholarships),
            "total_potential_amount": total_potential_amount
        }
    }
    
    return {"dashboard": dashboard_data}

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": "Resource not found", "error": "Not Found"}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "error": "Internal Server Error"}
    )

if __name__ == "__main__":
    # Create necessary directories
    os.makedirs("generated_pdfs", exist_ok=True)
    os.makedirs("static", exist_ok=True)
    
    # Run the server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict, Optional
import json
from datetime import datetime
import uvicorn
from pdf_generator import generate_scholarship_pdf

app = FastAPI(title="DBT Student Portal API", version="1.0.0")

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class StudentProfile(BaseModel):
    student_id: Optional[str] = None
    name: str
    email: str
    phone: str
    aadhaar: str
    dob: str
    gender: str
    category: str
    family_income: float
    father_name: Optional[str] = None
    mother_name: Optional[str] = None
    address: Optional[str] = None
    district: str
    state: str
    college_name: str
    course: str
    year_of_study: int
    cgpa: float
    bank_account: str
    ifsc_code: str
    dbt_status: str
    disabilities: List[str] = []
    achievements: List[str] = []
    extracurricular: List[str] = []

class ScholarshipRecommendation(BaseModel):
    scholarship_id: str
    name: str
    provider: str
    amount: float
    eligibility_score: float
    match_reasons: List[str]
    deadline: str
    application_link: str
    requirements: List[str]
    category: str

class RecommendationRequest(BaseModel):
    student_profile: StudentProfile
    preferences: Optional[Dict] = {}

class PDFGenerationRequest(BaseModel):
    student_profile: Dict
    recommendations: List[Dict]

# Mock scholarship database
SCHOLARSHIPS_DB = [
    {
        "scholarship_id": "SCH001",
        "name": "National Merit Scholarship",
        "provider": "Government of India",
        "amount": 50000,
        "deadline": "2024-03-31",
        "application_link": "https://scholarships.gov.in/merit",
        "requirements": ["CGPA >= 8.0", "Family income < 500000", "DBT enabled"],
        "category": "Merit-based",
        "eligibility_criteria": {
            "min_cgpa": 8.0,
            "max_income": 500000,
            "categories": ["General", "OBC", "SC", "ST"],
            "dbt_required": True
        }
    },
    {
        "scholarship_id": "SCH002", 
        "name": "SC/ST Development Scholarship",
        "provider": "Ministry of Social Justice",
        "amount": 75000,
        "deadline": "2024-04-15",
        "application_link": "https://scholarships.gov.in/scst",
        "requirements": ["SC/ST category", "Family income < 250000", "DBT enabled"],
        "category": "Category-based",
        "eligibility_criteria": {
            "min_cgpa": 6.0,
            "max_income": 250000,
            "categories": ["SC", "ST"],
            "dbt_required": True
        }
    },
    {
        "scholarship_id": "SCH003",
        "name": "Women Empowerment Scholarship",
        "provider": "Ministry of Women Development",
        "amount": 40000,
        "deadline": "2024-05-01",
        "application_link": "https://scholarships.gov.in/women",
        "requirements": ["Female students", "CGPA >= 7.0", "DBT enabled"],
        "category": "Gender-based",
        "eligibility_criteria": {
            "min_cgpa": 7.0,
            "max_income": 600000,
            "gender": "Female",
            "dbt_required": True
        }
    },
    {
        "scholarship_id": "SCH004",
        "name": "Disability Support Scholarship",
        "provider": "Ministry of Social Justice",
        "amount": 60000,
        "deadline": "2024-04-30",
        "application_link": "https://scholarships.gov.in/disability",
        "requirements": ["Disability certificate", "CGPA >= 6.5", "DBT enabled"],
        "category": "Disability-based",
        "eligibility_criteria": {
            "min_cgpa": 6.5,
            "max_income": 800000,
            "disabilities_required": True,
            "dbt_required": True
        }
    },
    {
        "scholarship_id": "SCH005",
        "name": "Engineering Excellence Award",
        "provider": "AICTE",
        "amount": 100000,
        "deadline": "2024-06-15",
        "application_link": "https://aicte-india.org/scholarships",
        "requirements": ["Engineering course", "CGPA >= 8.5", "DBT enabled"],
        "category": "Course-specific",
        "eligibility_criteria": {
            "min_cgpa": 8.5,
            "max_income": 1000000,
            "courses": ["Engineering", "Technology"],
            "dbt_required": True
        }
    }
]

def calculate_eligibility_score(student: StudentProfile, scholarship: Dict) -> float:
    """Calculate eligibility score for a scholarship based on student profile"""
    score = 0.0
    criteria = scholarship["eligibility_criteria"]
    
    # CGPA score (30% weight)
    if student.cgpa >= criteria.get("min_cgpa", 0):
        cgpa_score = min(student.cgpa / 10.0, 1.0)
        score += cgpa_score * 30
    
    # Income score (25% weight)
    if student.family_income <= criteria.get("max_income", float('inf')):
        income_score = max(0, (criteria.get("max_income", 1000000) - student.family_income) / criteria.get("max_income", 1000000))
        score += income_score * 25
    
    # Category match (20% weight)
    if "categories" in criteria and student.category in criteria["categories"]:
        score += 20
    
    # Gender match (10% weight)
    if "gender" in criteria and student.gender == criteria["gender"]:
        score += 10
    
    # Course match (10% weight)
    if "courses" in criteria:
        for course in criteria["courses"]:
            if course.lower() in student.course.lower():
                score += 10
                break
    
    # Disability match (15% weight)
    if criteria.get("disabilities_required") and student.disabilities:
        score += 15
    
    # DBT requirement (mandatory)
    if criteria.get("dbt_required") and student.dbt_status != "Active":
        score = 0  # Disqualify if DBT not active
    
    return min(score, 100.0)

def get_match_reasons(student: StudentProfile, scholarship: Dict, score: float) -> List[str]:
    """Generate reasons why this scholarship matches the student"""
    reasons = []
    criteria = scholarship["eligibility_criteria"]
    
    if student.cgpa >= criteria.get("min_cgpa", 0):
        reasons.append(f"Your CGPA ({student.cgpa}) meets the minimum requirement")
    
    if student.family_income <= criteria.get("max_income", float('inf')):
        reasons.append(f"Your family income qualifies for this scholarship")
    
    if "categories" in criteria and student.category in criteria["categories"]:
        reasons.append(f"Available for {student.category} category students")
    
    if "gender" in criteria and student.gender == criteria["gender"]:
        reasons.append(f"Specifically for {student.gender} students")
    
    if student.disabilities and criteria.get("disabilities_required"):
        reasons.append("Special support for students with disabilities")
    
    if "courses" in criteria:
        for course in criteria["courses"]:
            if course.lower() in student.course.lower():
                reasons.append(f"Available for {student.course} students")
                break
    
    if score >= 80:
        reasons.append("High compatibility match")
    elif score >= 60:
        reasons.append("Good compatibility match")
    
    return reasons

@app.get("/")
async def root():
    return {"message": "DBT Student Portal API", "version": "1.0.0"}

@app.post("/api/scholarships/recommendations", response_model=List[ScholarshipRecommendation])
async def get_scholarship_recommendations(request: RecommendationRequest):
    """Get personalized scholarship recommendations for a student"""
    try:
        student = request.student_profile
        recommendations = []
        
        for scholarship in SCHOLARSHIPS_DB:
            # Calculate eligibility score
            score = calculate_eligibility_score(student, scholarship)
            
            # Only include scholarships with score > 0 (meets basic requirements)
            if score > 0:
                match_reasons = get_match_reasons(student, scholarship, score)
                
                recommendation = ScholarshipRecommendation(
                    scholarship_id=scholarship["scholarship_id"],
                    name=scholarship["name"],
                    provider=scholarship["provider"],
                    amount=scholarship["amount"],
                    eligibility_score=round(score, 2),
                    match_reasons=match_reasons,
                    deadline=scholarship["deadline"],
                    application_link=scholarship["application_link"],
                    requirements=scholarship["requirements"],
                    category=scholarship["category"]
                )
                recommendations.append(recommendation)
        
        # Sort by eligibility score (highest first)
        recommendations.sort(key=lambda x: x.eligibility_score, reverse=True)
        
        return recommendations
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

@app.post("/api/pdf/generate-recommendations")
async def generate_recommendations_pdf(request: PDFGenerationRequest):
    """Generate PDF report for scholarship recommendations"""
    try:
        # Generate PDF
        pdf_buffer = generate_scholarship_pdf(
            request.student_profile, 
            request.recommendations
        )
        
        # Create filename
        student_name = request.student_profile.get('name', 'Student').replace(' ', '_')
        filename = f"Scholarship_Recommendations_{student_name}.pdf"
        
        # Return PDF as streaming response
        return StreamingResponse(
            iter([pdf_buffer.getvalue()]),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating PDF: {str(e)}")

@app.get("/api/pdf/sample")
async def generate_sample_pdf():
    """Generate a sample PDF for testing"""
    sample_student = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "course": "Computer Science Engineering",
        "cgpa": 8.5,
        "category": "General",
        "family_income": 400000,
        "dbt_status": "Active"
    }
    
    sample_recommendations = [
        {
            "name": "National Merit Scholarship",
            "provider": "Government of India",
            "amount": 50000,
            "eligibility_score": 85.5,
            "category": "Merit-based",
            "deadline": "2024-03-31",
            "application_link": "https://scholarships.gov.in/merit",
            "match_reasons": [
                "Your CGPA (8.5) meets the minimum requirement",
                "Your family income qualifies for this scholarship",
                "High compatibility match"
            ],
            "requirements": [
                "CGPA >= 8.0",
                "Family income < 500000",
                "DBT enabled"
            ]
        }
    ]
    
    try:
        pdf_buffer = generate_scholarship_pdf(sample_student, sample_recommendations)
        
        return StreamingResponse(
            iter([pdf_buffer.getvalue()]),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=Sample_Scholarship_Report.pdf"}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating sample PDF: {str(e)}")

@app.get("/api/scholarships/all")
async def get_all_scholarships():
    """Get all available scholarships"""
    return SCHOLARSHIPS_DB

@app.get("/api/scholarships/{scholarship_id}")
async def get_scholarship_details(scholarship_id: str):
    """Get details of a specific scholarship"""
    for scholarship in SCHOLARSHIPS_DB:
        if scholarship["scholarship_id"] == scholarship_id:
            return scholarship
    raise HTTPException(status_code=404, detail="Scholarship not found")

@app.post("/api/student/profile/validate")
async def validate_student_profile(profile: StudentProfile):
    """Validate student profile data"""
    errors = []
    
    # Basic validations
    if not profile.name or len(profile.name.strip()) < 2:
        errors.append("Name must be at least 2 characters long")
    
    if not profile.email or "@" not in profile.email:
        errors.append("Valid email address is required")
    
    if not profile.aadhaar or len(profile.aadhaar) != 12:
        errors.append("Aadhaar number must be 12 digits")
    
    if profile.cgpa < 0 or profile.cgpa > 10:
        errors.append("CGPA must be between 0 and 10")
    
    if profile.family_income < 0:
        errors.append("Family income cannot be negative")
    
    if profile.dbt_status not in ["Active", "Pending", "Not Linked"]:
        errors.append("Invalid DBT status")
    
    if errors:
        raise HTTPException(status_code=400, detail={"errors": errors})
    
    return {"message": "Profile validation successful", "valid": True}

@app.get("/api/analytics/dashboard")
async def get_dashboard_analytics():
    """Get analytics data for dashboard"""
    return {
        "total_scholarships": len(SCHOLARSHIPS_DB),
        "total_amount_available": sum(s["amount"] for s in SCHOLARSHIPS_DB),
        "categories": {
            "Merit-based": 1,
            "Category-based": 1, 
            "Gender-based": 1,
            "Disability-based": 1,
            "Course-specific": 1
        },
        "upcoming_deadlines": [
            {"name": "National Merit Scholarship", "deadline": "2024-03-31", "days_left": 45},
            {"name": "SC/ST Development Scholarship", "deadline": "2024-04-15", "days_left": 60}
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
