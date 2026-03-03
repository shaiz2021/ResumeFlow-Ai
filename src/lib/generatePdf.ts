import jsPDF from "jspdf";
import { ResumeData } from "@/types/resume";

export const generateResumePdf = (data: ResumeData) => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;
  let y = 50;

  const checkPage = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - 50) {
      doc.addPage();
      y = 50;
    }
  };

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(data.personal.fullName || "Your Name", pageWidth / 2, y, { align: "center" });
  y += 22;

  // Job title
  if (data.personal.jobTitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 200);
    doc.text(data.personal.jobTitle, pageWidth / 2, y, { align: "center" });
    doc.setTextColor(0);
    y += 16;
  }

  // Contact info
  const contactParts = [data.personal.email, data.personal.phone, data.personal.location].filter(Boolean);
  if (contactParts.length) {
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(contactParts.join(" • "), pageWidth / 2, y, { align: "center" });
    doc.setTextColor(0);
    y += 12;
  }

  const linkParts = [data.personal.linkedin, data.personal.website].filter(Boolean);
  if (linkParts.length) {
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 180);
    doc.text(linkParts.join(" • "), pageWidth / 2, y, { align: "center" });
    doc.setTextColor(0);
    y += 12;
  }

  y += 8;

  const drawSection = (title: string) => {
    checkPage(30);
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(title.toUpperCase(), margin, y);
    y += 16;
  };

  // Summary
  if (data.summary) {
    drawSection("Summary");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(data.summary, contentWidth);
    checkPage(lines.length * 14);
    doc.text(lines, margin, y);
    y += lines.length * 14 + 8;
  }

  // Experience
  if (data.experience.length > 0) {
    drawSection("Experience");
    data.experience.forEach(exp => {
      checkPage(40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(exp.role || "Position", margin, y);
      const dateStr = `${exp.startDate}${exp.endDate ? ` – ${exp.endDate}` : ""}`;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(dateStr, pageWidth - margin, y, { align: "right" });
      y += 14;
      doc.setTextColor(80, 80, 180);
      doc.text(exp.company, margin, y);
      doc.setTextColor(0);
      y += 14;

      exp.bullets.filter(b => b).forEach(b => {
        checkPage(14);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        const bulletLines = doc.splitTextToSize(`• ${b}`, contentWidth - 10);
        doc.text(bulletLines, margin + 10, y);
        y += bulletLines.length * 13;
      });
      y += 6;
    });
  }

  // Education
  if (data.education.length > 0) {
    drawSection("Education");
    data.education.forEach(edu => {
      checkPage(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(edu.school || "School", margin, y);
      const dateStr = `${edu.startDate}${edu.endDate ? ` – ${edu.endDate}` : ""}`;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(dateStr, pageWidth - margin, y, { align: "right" });
      y += 14;
      const degreeStr = `${edu.degree}${edu.field ? ` in ${edu.field}` : ""}${edu.gpa ? ` • GPA: ${edu.gpa}` : ""}`;
      doc.text(degreeStr, margin, y);
      y += 18;
    });
  }

  // Skills
  if (data.skills.length > 0) {
    drawSection("Skills");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const skillsText = data.skills.join("  •  ");
    const skillLines = doc.splitTextToSize(skillsText, contentWidth);
    checkPage(skillLines.length * 14);
    doc.text(skillLines, margin, y);
  }

  doc.save(`${(data.personal.fullName || "resume").replace(/\s+/g, "-").toLowerCase()}-resume.pdf`);
};
