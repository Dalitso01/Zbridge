// WhatsApp & SMS notification service
// Uses Africa's Talking API — already familiar from CollateralIQ
// In production, these calls go through your backend to protect API keys

const AT_API_BASE = "https://api.africastalking.com/version1";

// For demo/dev: logs notifications to console
// For production: replace with your backend endpoint e.g. POST /api/notify

export async function sendSMSNotification(phoneNumber, message) {
  // Format Zambian numbers: 09x -> +2609x
  const formatted = phoneNumber.startsWith("0")
    ? "+260" + phoneNumber.slice(1)
    : phoneNumber;

  console.log(`[SMS] To: ${formatted}\nMessage: ${message}`);

  // Production: call your backend
  // await fetch("/api/sms", { method: "POST", body: JSON.stringify({ to: formatted, message }) });
  return { success: true, to: formatted };
}

export async function sendWhatsAppMessage(phoneNumber, message) {
  const formatted = phoneNumber.startsWith("0")
    ? "+260" + phoneNumber.slice(1)
    : phoneNumber;

  console.log(`[WhatsApp] To: ${formatted}\nMessage: ${message}`);

  // Production: call your WhatsApp Business API backend
  return { success: true, to: formatted };
}

// Notification templates
export const notifications = {
  simulationComplete: (userName, simTitle, certUrl) =>
    `Hi ${userName}! 🎉 You've completed the "${simTitle}" simulation on ZBRIDGE. Download your certificate: ${certUrl || "zbridge.com/certificates"} — Add it to your CV and LinkedIn!`,

  newSimulation: (simTitle, category) =>
    `New simulation available on ZBRIDGE: "${simTitle}" (${category}). Start now: zbridge.com/simulations`,

  reminderIncomplete: (userName, simTitle, tasksLeft) =>
    `Hi ${userName}, you have ${tasksLeft} task(s) left in "${simTitle}". Continue where you left off: zbridge.com/simulations — You're almost there!`,

  weeklyDigest: (userName, newCount) =>
    `Hi ${userName}! ${newCount} new simulations added to ZBRIDGE this week. Log in to explore: zbridge.com`,

  mentorReply: (userName, mentorName) =>
    `Hi ${userName}, ${mentorName} has responded to your feedback request on ZBRIDGE. Check your dashboard: zbridge.com/dashboard`,
};

// Send completion notification
export async function notifySimulationComplete(profile, simulation) {
  if (!profile?.phone) return;

  const message = notifications.simulationComplete(
    profile.name || "there",
    simulation.title,
    null
  );

  await sendWhatsAppMessage(profile.phone, message);
  await sendSMSNotification(profile.phone, message);
}
