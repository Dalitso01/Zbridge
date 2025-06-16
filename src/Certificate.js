// filepath: c:\Users\USER\zbridge\src\Certificate.js
import jsPDF from "jspdf";

export function generateCertificate(userName, simulationTitle) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("Certificate of Completion", 20, 30);
  doc.setFontSize(16);
  doc.text(`Awarded to: ${userName}`, 20, 50);
  doc.text(`For completing: ${simulationTitle}`, 20, 70);
  doc.save("certificate.pdf");
}