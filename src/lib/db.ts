import { Customer, Ticket, Message, Priority, Channel, TicketStatus, Escalation } from './types';

// Mock data storage in memory for the demo
let customers: Customer[] = [
  { id: 'cust-1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', createdAt: new Date(Date.now() - 10000000), metadata: {} },
  { id: 'cust-2', name: 'Jane Smith', email: 'jane@smith.io', createdAt: new Date(Date.now() - 20000000), metadata: {} },
];

let tickets: Ticket[] = [
  { id: 'TKT-1001', conversationId: 'conv-1', customerId: 'cust-1', sourceChannel: 'web_form', category: 'Technical', priority: 'high', status: 'open', createdAt: new Date(Date.now() - 3600000), subject: 'API Integration Failure' },
  { id: 'TKT-1002', conversationId: 'conv-2', customerId: 'cust-2', sourceChannel: 'email', category: 'Billing', priority: 'medium', status: 'escalated', createdAt: new Date(Date.now() - 7200000), subject: 'Subscription Billing Error' },
  { id: 'TKT-1003', conversationId: 'conv-3', customerId: 'cust-1', sourceChannel: 'whatsapp', category: 'General', priority: 'low', status: 'resolved', createdAt: new Date(Date.now() - 86400000), subject: 'Feature Inquiry' },
];

let messages: Message[] = [
  { id: 'msg-1', conversationId: 'conv-1', channel: 'web_form', direction: 'inbound', role: 'customer', content: 'My integration with the API is failing with a 500 error.', createdAt: new Date(Date.now() - 3600000), sentiment: 'negative', sentimentScore: -0.4 },
  { id: 'msg-2', conversationId: 'conv-2', channel: 'email', direction: 'inbound', role: 'customer', content: 'I was charged twice for this month.', createdAt: new Date(Date.now() - 7200000), sentiment: 'neutral', sentimentScore: 0 },
  { id: 'msg-3', conversationId: 'conv-3', channel: 'whatsapp', direction: 'inbound', role: 'customer', content: 'Do you support dark mode?', createdAt: new Date(Date.now() - 86400000), sentiment: 'positive', sentimentScore: 0.6 },
];

let escalations: Escalation[] = [
  { id: 'esc-1', ticketId: 'TKT-1002', reason: 'Customer mentions legal action', summary: 'Customer is upset about billing and mentioned "legal team".', escalatedAt: new Date(Date.now() - 7200000) }
];

export const db = {
  getCustomers: async () => customers,
  getCustomerById: async (id: string) => customers.find(c => c.id === id),
  getCustomerByEmail: async (email: string) => customers.find(c => c.email.toLowerCase() === email.toLowerCase()),
  
  getTickets: async () => tickets,
  getTicketById: async (id: string) => tickets.find(t => t.id === id),
  createTicket: async (ticket: Omit<Ticket, 'id' | 'createdAt'>) => {
    const newTicket = { ...ticket, id: `TKT-${Math.floor(Math.random() * 10000)}`, createdAt: new Date() };
    tickets.push(newTicket);
    return newTicket;
  },
  updateTicketStatus: async (id: string, status: TicketStatus) => {
    const t = tickets.find(t => t.id === id);
    if (t) t.status = status;
  },

  getMessagesByConversation: async (conversationId: string) => messages.filter(m => m.conversationId === conversationId).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
  createMessage: async (msg: Omit<Message, 'id' | 'createdAt'>) => {
    const newMsg = { ...msg, id: `msg-${Math.random().toString(36).substr(2, 9)}`, createdAt: new Date() };
    messages.push(newMsg);
    return newMsg;
  },

  getEscalations: async () => escalations,
  createEscalation: async (esc: Omit<Escalation, 'id' | 'escalatedAt'>) => {
    const newEsc = { ...esc, id: `esc-${Math.random().toString(36).substr(2, 9)}`, escalatedAt: new Date() };
    escalations.push(newEsc);
    return newEsc;
  }
};
