import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().refine(val => !val || /^[+]?[\d\s-]{8,}$/.test(val), {
    message: "Please enter a valid phone number"
  }),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service").refine(
    (val) => [
      "IT Services",
      "Marketing Solutions",
      "AI Automation",
      "Web Development",
      "Penetration Testing",
      "Cybersecurity",
    ].includes(val),
    { message: "Please select a valid service" }
  ),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
