'use server';
/**
 * @fileOverview This flow retrieves and summarizes the context for an AI-escalated ticket,
 * providing the human support agent with a clear reason for escalation and a concise conversation summary.
 *
 * - aiEscalationContext - A function that fetches escalation details and generates a conversation summary.
 * - AiEscalationContextInput - The input type for the aiEscalationContext function.
 * - AiEscalationContextOutput - The return type for the aiEscalationContext function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Simulate database interactions
// In a real application, these would interact with the PostgreSQL database defined in the proposal.

// Mock data for demonstration purposes, mimicking the database schema structures.
// In a full implementation, these would be actual database queries using asyncpg.
const mockTickets = {
  'ticket-123': {
    conversationId: 'conv-456',
    rawEscalationReason: 'Customer used profanity (sentiment < 0.3) and mentioned "legal".',
  },
  'ticket-789': {
    conversationId: 'conv-012',
    rawEscalationReason: 'Cannot find relevant information after 2 search attempts for "refund policy".',
  },
  'ticket-555': {
    conversationId: 'conv-666',
    rawEscalationReason: 'Customer explicitly requested human help after being unable to resolve a complex technical issue.',
  }
};

const mockConversations = {
  'conv-456': [
    { role: 'customer', content: 'I need help with my account. This is ridiculous!', direction: 'inbound' },
    { role: 'agent', content: 'I understand your frustration. Could you please describe the issue in more detail?', direction: 'outbound' },
    { role: 'customer', content: 'Your product is broken! I am going to contact my legal team if this is not resolved!', direction: 'inbound' },
  ],
  'conv-012': [
    { role: 'customer', content: 'What is your refund policy?', direction: 'inbound' },
    { role: 'agent', content: 'Our refund policy details are available in our knowledge base. Would you like me to provide a link?', direction: 'outbound' },
    { role: 'customer', content: 'I already looked, I cannot find it. Please tell me directly what it is.', direction: 'inbound' },
    { role: 'agent', content: 'I apologize, I am having trouble locating the specific document for you. Would you like me to escalate this to a human agent?', direction: 'outbound' },
  ],
  'conv-666': [
    { role: 'customer', content: 'My integration with the API is failing with a 500 error. I followed all the docs.', direction: 'inbound' },
    { role: 'agent', content: 'Could you provide the exact error message and the endpoint you are hitting?', direction: 'outbound' },
    { role: 'customer', content: 'The error is "Internal Server Error". I am hitting /api/v1/data. Can I talk to a human now, please?', direction: 'inbound' },
  ]
};

async function getEscalationDetailsFromDb(ticketId: string): Promise<{ conversationId: string; rawEscalationReason: string } | null> {
  // In a real application, this would query the 'tickets' table.
  return Promise.resolve(mockTickets[ticketId] || null);
}

async function getConversationMessagesFromDb(conversationId: string): Promise<Array<{ role: string; content: string; direction: string }>> {
  // In a real application, this would query the 'messages' table.
  return Promise.resolve(mockConversations[conversationId] || []);
}


const AiEscalationContextInputSchema = z.object({
  ticketId: z.string().describe('The ID of the escalated support ticket.'),
});
export type AiEscalationContextInput = z.infer<typeof AiEscalationContextInputSchema>;

const AiEscalationContextOutputSchema = z.object({
  escalationReason: z.string().describe("A clear, AI-generated reason for the ticket's escalation."),
  conversationSummary: z.string().describe('A concise summary of the conversation leading up to the escalation.'),
});
export type AiEscalationContextOutput = z.infer<typeof AiEscalationContextOutputSchema>;

export async function aiEscalationContext(input: AiEscalationContextInput): Promise<AiEscalationContextOutput> {
  return aiEscalationContextFlow(input);
}

const escalationContextPrompt = ai.definePrompt({
  name: 'escalationContextPrompt',
  input: {
    schema: z.object({
      conversationHistory: z.string().describe('The full conversation history between customer and agent.'),
      rawEscalationReason: z.string().describe('The raw reason provided by the AI for escalation.'),
    }),
  },
  output: {
    schema: AiEscalationContextOutputSchema,
  },
  prompt: `You are an assistant for a human support agent. Your task is to process an AI-escalated support ticket.
You will be provided with the full conversation history and the AI's raw reason for escalation.

Your goals are:
1. Rephrase the provided raw escalation reason into a clear, concise, and professional statement for a human agent.
2. Provide a concise summary of the conversation, highlighting key points and the events leading up to the escalation.

Conversation History:
{{{conversationHistory}}}

Raw Escalation Reason:
{{{rawEscalationReason}}}

Provide the output in JSON format, with the following fields:
"escalationReason": "<rephrased_reason_for_escalation>",
"conversationSummary": "<concise_summary_of_conversation>"
`,
});

const aiEscalationContextFlow = ai.defineFlow(
  {
    name: 'aiEscalationContextFlow',
    inputSchema: AiEscalationContextInputSchema,
    outputSchema: AiEscalationContextOutputSchema,
  },
  async (input) => {
    const { ticketId } = input;

    // 1. Retrieve escalation details from the (simulated) database
    const escalationDetails = await getEscalationDetailsFromDb(ticketId);

    if (!escalationDetails) {
      throw new Error(`Escalation details not found for ticket ID: ${ticketId}`);
    }

    const { conversationId, rawEscalationReason } = escalationDetails;

    // 2. Retrieve conversation messages from the (simulated) database
    const messages = await getConversationMessagesFromDb(conversationId);

    if (!messages || messages.length === 0) {
      throw new Error(`Conversation messages not found for conversation ID: ${conversationId}`);
    }

    // Format conversation history for the prompt
    const conversationHistory = messages
      .map(msg => `${msg.role.charAt(0).toUpperCase() + msg.role.slice(1)} (${msg.direction}): ${msg.content}`)
      .join('\n');

    // 3. Call the prompt to generate the summary and rephrased reason
    const { output } = await escalationContextPrompt({
      conversationHistory,
      rawEscalationReason,
    });

    return output!;
  }
);
