'use server';
/**
 * @fileOverview A Genkit flow that generates an AI-powered confirmation message for web form submissions.
 *
 * - aiWebFormConfirmation - A function that handles the AI-generated confirmation message process.
 * - AiWebFormConfirmationInput - The input type for the aiWebFormConfirmation function.
 * - AiWebFormConfirmationOutput - The return type for the aiWebFormConfirmation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiWebFormConfirmationInputSchema = z.object({
  name: z.string().describe("The customer's name."),
  email: z.string().email().describe("The customer's email address."),
  subject: z.string().describe('The subject of the support inquiry.'),
  category: z.string().describe('The category of the support inquiry.'),
  message: z.string().describe('The detailed message from the customer.'),
});
export type AiWebFormConfirmationInput = z.infer<typeof AiWebFormConfirmationInputSchema>;

const AiWebFormConfirmationOutputSchema = z.object({
  confirmationMessage: z
    .string()
    .describe('An AI-generated confirmation message acknowledging the issue and providing reassurance.'),
  estimatedResponseTime: z.string().describe('The estimated response time for the inquiry (e.g., "within 5 minutes", "24-48 hours").'),
});
export type AiWebFormConfirmationOutput = z.infer<typeof AiWebFormConfirmationOutputSchema>;

export async function aiWebFormConfirmation(input: AiWebFormConfirmationInput): Promise<AiWebFormConfirmationOutput> {
  return aiWebFormConfirmationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiWebFormConfirmationPrompt',
  input: {schema: AiWebFormConfirmationInputSchema},
  output: {schema: AiWebFormConfirmationOutputSchema},
  prompt: `You are an AI-powered customer support assistant for TechCorp SaaS.
Your task is to generate a professional and reassuring confirmation message for a customer who has just submitted a support request via a web form.

The message should:
- Acknowledge the customer by name.
- Clearly confirm receipt of their inquiry.
- Briefly restate the core issue based on their subject and message.
- Provide an estimated response time. For 'technical' and 'billing' categories, estimate 'within 24-48 hours'. For 'general' and 'feedback' categories, estimate 'within 5 minutes'. For 'bug_report', estimate 'within 1-2 business days'.
- Reassure them that their request is important and being handled.
- Maintain a professional and helpful tone.

Customer Details:
Name: {{{name}}}
Email: {{{email}}}
Subject: {{{subject}}}
Category: {{{category}}}
Message: {{{message}}}`,
});

const aiWebFormConfirmationFlow = ai.defineFlow(
  {
    name: 'aiWebFormConfirmationFlow',
    inputSchema: AiWebFormConfirmationInputSchema,
    outputSchema: AiWebFormConfirmationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  },
);
