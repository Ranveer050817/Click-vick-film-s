export const openWhatsApp = (
  targetPhone: string,
  details?: { name?: string; eventType?: string; eventDate?: string; location?: string } | any
) => {
  const data = (details && !('nativeEvent' in details) && !('preventDefault' in details)) ? details : {};

  const message = `Hello Click Vick Films,

I visited your website and I'm interested in your photography services.

My Name: ${data.name || ""}
Event Type: ${data.eventType || ""}
Event Date: ${data.eventDate || ""}
Location: ${data.location || ""}

Please share your packages and availability.

Thank you.`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${targetPhone.replace("+", "")}?text=${encodedMessage}`;
  window.open(url, "_blank");
};

