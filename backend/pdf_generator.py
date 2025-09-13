from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from io import BytesIO
from datetime import datetime
from typing import List, Dict

class ScholarshipReportGenerator:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self.setup_custom_styles()
    
    def setup_custom_styles(self):
        """Setup custom styles for the PDF"""
        self.title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=18,
            spaceAfter=30,
            alignment=TA_CENTER,
            textColor=colors.darkblue
        )
        
        self.heading_style = ParagraphStyle(
            'CustomHeading',
            parent=self.styles['Heading2'],
            fontSize=14,
            spaceAfter=12,
            textColor=colors.darkblue
        )
        
        self.normal_style = ParagraphStyle(
            'CustomNormal',
            parent=self.styles['Normal'],
            fontSize=10,
            spaceAfter=6
        )
    
    def generate_recommendations_report(self, student_profile: Dict, recommendations: List[Dict]) -> BytesIO:
        """Generate PDF report for scholarship recommendations"""
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
        
        # Container for the 'Flowable' objects
        elements = []
        
        # Title
        title = Paragraph("Personalized Scholarship Recommendations Report", self.title_style)
        elements.append(title)
        elements.append(Spacer(1, 12))
        
        # Student Information Section
        elements.append(Paragraph("Student Information", self.heading_style))
        
        student_data = [
            ['Name:', student_profile.get('name', 'N/A')],
            ['Email:', student_profile.get('email', 'N/A')],
            ['Course:', student_profile.get('course', 'N/A')],
            ['CGPA:', str(student_profile.get('cgpa', 'N/A'))],
            ['Category:', student_profile.get('category', 'N/A')],
            ['Family Income:', f"₹{student_profile.get('family_income', 0):,.2f}"],
            ['DBT Status:', student_profile.get('dbt_status', 'N/A')],
            ['Report Generated:', datetime.now().strftime('%Y-%m-%d %H:%M:%S')]
        ]
        
        student_table = Table(student_data, colWidths=[2*inch, 4*inch])
        student_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        elements.append(student_table)
        elements.append(Spacer(1, 20))
        
        # Recommendations Section
        elements.append(Paragraph("Scholarship Recommendations", self.heading_style))
        elements.append(Paragraph(f"Found {len(recommendations)} matching scholarships based on your profile:", self.normal_style))
        elements.append(Spacer(1, 12))
        
        # Add each recommendation
        for i, rec in enumerate(recommendations, 1):
            # Scholarship header
            scholarship_title = f"{i}. {rec.get('name', 'Unknown Scholarship')}"
            elements.append(Paragraph(scholarship_title, self.heading_style))
            
            # Scholarship details table
            rec_data = [
                ['Provider:', rec.get('provider', 'N/A')],
                ['Amount:', f"₹{rec.get('amount', 0):,.2f}"],
                ['Eligibility Score:', f"{rec.get('eligibility_score', 0):.1f}%"],
                ['Category:', rec.get('category', 'N/A')],
                ['Deadline:', rec.get('deadline', 'N/A')],
                ['Application Link:', rec.get('application_link', 'N/A')]
            ]
            
            rec_table = Table(rec_data, colWidths=[1.5*inch, 4.5*inch])
            rec_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.lightblue),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 0), (-1, -1), 9),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            
            elements.append(rec_table)
            
            # Match reasons
            if rec.get('match_reasons'):
                elements.append(Spacer(1, 6))
                elements.append(Paragraph("Why this scholarship matches you:", self.normal_style))
                for reason in rec.get('match_reasons', []):
                    elements.append(Paragraph(f"• {reason}", self.normal_style))
            
            # Requirements
            if rec.get('requirements'):
                elements.append(Spacer(1, 6))
                elements.append(Paragraph("Requirements:", self.normal_style))
                for req in rec.get('requirements', []):
                    elements.append(Paragraph(f"• {req}", self.normal_style))
            
            elements.append(Spacer(1, 20))
        
        # Footer
        elements.append(Spacer(1, 30))
        footer_text = """
        <b>Important Notes:</b><br/>
        • Ensure your DBT is active before applying for any scholarship<br/>
        • Verify all eligibility criteria before submitting applications<br/>
        • Keep all required documents ready<br/>
        • Apply before the deadline dates<br/>
        • This report is generated based on the information provided and may not reflect real-time changes
        """
        elements.append(Paragraph(footer_text, self.normal_style))
        
        # Build PDF
        doc.build(elements)
        buffer.seek(0)
        return buffer

def generate_scholarship_pdf(student_profile: Dict, recommendations: List[Dict]) -> BytesIO:
    """Convenience function to generate scholarship recommendations PDF"""
    generator = ScholarshipReportGenerator()
    return generator.generate_recommendations_report(student_profile, recommendations)
