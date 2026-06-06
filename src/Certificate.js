import jsPDF from "jspdf";

export function generateCertificate(userName, simulationTitle, partner, completionDate) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;

  // Background
  doc.setFillColor(5, 13, 26);
  doc.rect(0, 0, W, H, "F");

  // Gold border
  doc.setDrawColor(255, 214, 0);
  doc.setLineWidth(1.5);
  doc.rect(8, 8, W - 16, H - 16);
  doc.setLineWidth(0.5);
  doc.rect(11, 11, W - 22, H - 22);

  // Header band
  doc.setFillColor(26, 35, 126);
  doc.rect(8, 8, W - 16, 18, "F");

  // ZBRIDGE logo text
  doc.setTextColor(255, 214, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("ZBRIDGE", 20, 20);

  // Partner label
  const partnerLabel = partner ? ("In partnership with " + partner) : "Zambia Career Platform";
  doc.setTextColor(200, 210, 230);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(partnerLabel, W - 20, 20, { align: "right" });

  // Certificate of Completion
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("CERTIFICATE OF COMPLETION", W / 2, 45, { align: "center" });

  // Decorative line
  doc.setDrawColor(255, 214, 0);
  doc.setLineWidth(0.8);
  doc.line(W / 2 - 60, 49, W / 2 + 60, 49);

  doc.setTextColor(180, 195, 215);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.text("This certifies that", W / 2, 63, { align: "center" });

  // Name
  doc.setTextColor(255, 214, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text(userName || "Graduate", W / 2, 83, { align: "center" });

  doc.setDrawColor(255, 214, 0);
  doc.setLineWidth(0.4);
  var nameWidth = doc.getTextWidth(userName || "Graduate");
  doc.line(W / 2 - nameWidth / 2, 86, W / 2 + nameWidth / 2, 86);

  doc.setTextColor(180, 195, 215);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.text("has successfully completed the simulation", W / 2, 98, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(simulationTitle || "Professional Simulation", W / 2, 116, { align: "center" });

  doc.setTextColor(180, 195, 215);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("demonstrating practical knowledge and professional skills in an African business context", W / 2, 128, { align: "center" });

  doc.setDrawColor(255, 214, 0);
  doc.setLineWidth(0.4);
  doc.line(20, 148, W - 20, 148);

  var dateStr = completionDate || new Date().toLocaleDateString("en-ZM", { year: "numeric", month: "long", day: "numeric" });
  doc.setTextColor(180, 195, 215);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Completed: " + dateStr, 20, 158);
  doc.text("Verification ID: ZB-" + Date.now().toString(36).toUpperCase(), W / 2, 158, { align: "center" });
  doc.setTextColor(100, 120, 150);
  doc.setFontSize(8);
  doc.text("Issued by ZBRIDGE | zbridge.com | Lusaka, Zambia", W - 20, 158, { align: "right" });

  doc.save("ZBRIDGE_Certificate_" + (userName || "graduate").replace(/\s+/g, "_") + ".pdf");
}
