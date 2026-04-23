export type Channel = 'email' | 'whatsapp' | 'web_form';
export type TicketStatus = 'open' | 'pending' | 'resolved' | 'escalated';
export type Priority = 'low' | 'medium' | 'high';
export type Role = 'customer' | 'agent' | 'system';
export type Direction = 'inbound' | 'outbound';

export interface Customer {
  id: string;
  email: string;
  phone?: string;
  name: string;
  createdAt: Date;
  metadata: Record<string, any>;
}

export interface Ticket {
  id: string;
  conversationId: string;
  customerId: string;
  sourceChannel: Channel;
  category: string;
  priority: Priority;
  status: TicketStatus;
  createdAt: Date;
  resolvedAt?: Date;
  resolutionNotes?: string;
  subject: string;
}

export interface Message {
  id: string;
  conversationId: string;
  channel: Channel;
  direction: Direction;
  role: Role;
  content: string;
  createdAt: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
  sentimentScore?: number;
}

export interface Escalation {
  id: string;
  ticketId: string;
  reason: string;
  summary: string;
  escalatedAt: Date;
}
