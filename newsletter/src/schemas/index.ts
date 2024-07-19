import { z } from "zod";

export const NewsletterSchema = z.object({
  name: z.string().min(1, { message: "Nom requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(1, { message: "Numéro de téléphone requis" }),
});

export type NewsletterType = z.infer<typeof NewsletterSchema>;
