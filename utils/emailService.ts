import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = "service_9icf1y9"; // Your live Service ID added!
const EMAILJS_TEMPLATE_ID = "template_4eqx4vb"; // Your active template ID
const EMAILJS_PUBLIC_KEY = "mM2hBZV2_KJXywPCG"; // Your public key

interface VaultEmailPayload {
  type: "Vault Reservation" | "User Sign Up" | "User Sign In" | "Contact Message";
  name: string;
  email: string;
  phone?: string;
  message?: string;
  country?: string;
  toEmail?: string;
  toName?: string;
}

/**
 * Dispatches a lead notification directly to your tracking system.
 */
export const sendVaultNotification = async (payload: VaultEmailPayload): Promise<boolean> => {
  try {
    const templateParams = {
      submission_type: payload.type,
      user_name: payload.name,
      user_email: payload.email,
      user_phone: payload.phone || "Not Provided",
      user_country: payload.country || "Not Specified",
      user_message: payload.message || "No additional info shared.",
      to_email: payload.toEmail || "salmanmaseed2168@gmail.com",
      to_name: payload.toName || "Luxury Vault Admin",
      reply_to: payload.email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.debug('[Vault Mailer] EmailJS response:', response);

    if (response.status === 200) {
      console.log(`[Vault Mailer] Successfully sent email tracking log for: ${payload.type}`);
      return true;
    }

    const responseText = JSON.stringify(response, Object.getOwnPropertyNames(response), 2)
    console.warn('[Vault Mailer] EmailJS returned non-200 status:', response)
    throw new Error(`EmailJS returned non-200 status: ${responseText}`)
  } catch (error) {
    console.error('[Vault Mailer System Error]:', error)
    const errorText = error instanceof Error ? error.message : JSON.stringify(error, Object.getOwnPropertyNames(error), 2) || String(error)
    throw new Error(`EmailJS send failed: ${errorText}`)
  }
};