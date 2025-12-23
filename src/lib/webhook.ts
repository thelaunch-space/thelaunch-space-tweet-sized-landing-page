// Webhook utility for sending lead submissions to Make.com
// Sends form data directly to the configured webhook URL

interface LeadPayload {
  project_description: string;
  email: string | null;
  whatsapp_number: string | null;
  prefer_whatsapp: boolean;
}

interface WebhookResponse {
  success: boolean;
  error?: string;
}

/**
 * Sends lead submission data to Make.com webhook
 * @param payload - The lead data to send
 * @returns Promise with success status and optional error message
 */
export async function sendLeadToWebhook(payload: LeadPayload): Promise<WebhookResponse> {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('VITE_WEBHOOK_URL environment variable is not set');
    return {
      success: false,
      error: 'Webhook URL is not configured',
    };
  }

  try {
    console.log('Sending payload to webhook:', payload);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Webhook response status:', response.status);
    console.log('Webhook response:', response);

    // Read response body once
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('Webhook request failed:', {
        status: response.status,
        statusText: response.statusText,
        error: responseText,
      });
      return {
        success: false,
        error: `Webhook request failed: ${response.status} ${response.statusText}`,
      };
    }

    // Try to parse response if it's JSON, otherwise just log it
    try {
      const responseData = JSON.parse(responseText);
      console.log('Webhook response data:', responseData);
    } catch {
      // Response might not be JSON, that's okay
      console.log('Webhook response text:', responseText);
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending webhook request:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}
