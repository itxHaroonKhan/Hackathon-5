'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing customer sentiment from conversation text.
 *
 * - analyzeCustomerSentiment - A function that takes customer conversation text and returns its sentiment.
 * - AnalyzeCustomerSentimentInput - The input type for the analyzeCustomerSentiment function.
 * - AnalyzeCustomerSentimentOutput - The return type for the analyzeCustomerSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCustomerSentimentInputSchema = z.object({
  conversationText: z
    .string()
    .describe('The customer conversation text to analyze for sentiment.'),
});
export type AnalyzeCustomerSentimentInput = z.infer<typeof AnalyzeCustomerSentimentInputSchema>;

const AnalyzeCustomerSentimentOutputSchema = z.object({
  sentiment: z.enum(['positive', 'neutral', 'negative']).describe('The overall sentiment of the conversation.'),
  score: z.number().min(-1.0).max(1.0).describe('A numerical score representing the sentiment intensity. Typically -1.0 for very negative, 0.0 for neutral, and 1.0 for very positive.'),
});
export type AnalyzeCustomerSentimentOutput = z.infer<typeof AnalyzeCustomerSentimentOutputSchema>;

export async function analyzeCustomerSentiment(input: AnalyzeCustomerSentimentInput): Promise<AnalyzeCustomerSentimentOutput> {
  return analyzeCustomerSentimentFlow(input);
}

const analyzeCustomerSentimentPrompt = ai.definePrompt({
  name: 'analyzeCustomerSentimentPrompt',
  input: {schema: AnalyzeCustomerSentimentInputSchema},
  output: {schema: AnalyzeCustomerSentimentOutputSchema},
  prompt: `Analyze the following customer conversation text to determine its sentiment. Categorize the sentiment as 'positive', 'neutral', or 'negative', and provide a sentiment score.

Conversation Text: {{{conversationText}}}

Consider the tone, word choice, and overall meaning to accurately assess the sentiment. Your response should be a JSON object conforming to the AnalyzeCustomerSentimentOutputSchema.`,
});

const analyzeCustomerSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeCustomerSentimentFlow',
    inputSchema: AnalyzeCustomerSentimentInputSchema,
    outputSchema: AnalyzeCustomerSentimentOutputSchema,
  },
  async input => {
    const {output} = await analyzeCustomerSentimentPrompt(input);
    if (!output) {
      throw new Error('Failed to get sentiment analysis from the model.');
    }
    return output;
  },
);
