from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict
from pdf_generator import generate_scholarship_pdf
import json

pdf_router = APIRouter()

class PDFGenerationRequest(BaseModel):
    student_profile: Dict
    recommendations: List[Dict]

@pdf_router.post("/api/pdf/generate-recommendations")
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

@pdf_router.get("/api/pdf/sample")
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
