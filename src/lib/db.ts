
'use client';

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Firestore
} from 'firebase/firestore';
import { getFirestore } from '@/firebase';
import { Customer, Ticket, Message, TicketStatus, Escalation } from './types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export const db = {
  getCustomers: async () => {
    const firestore = getFirestore();
    const snapshot = await getDocs(collection(firestore, 'customers'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer));
  },

  getCustomerById: async (id: string) => {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'customers', id);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } as Customer : null;
  },

  getTickets: async () => {
    const firestore = getFirestore();
    const snapshot = await getDocs(query(collection(firestore, 'tickets'), orderBy('createdAt', 'desc')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate() || new Date() } as Ticket));
  },

  getTicketById: async (id: string) => {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'tickets', id);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data(), createdAt: snap.data().createdAt?.toDate() || new Date() } as Ticket : null;
  },

  createTicket: async (ticket: Omit<Ticket, 'id' | 'createdAt'>) => {
    const firestore = getFirestore();
    const ticketsRef = collection(firestore, 'tickets');
    const data = {
      ...ticket,
      createdAt: serverTimestamp()
    };

    return addDoc(ticketsRef, data)
      .then(docRef => ({ id: docRef.id, ...ticket, createdAt: new Date() }))
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'tickets',
          operation: 'create',
          requestResourceData: data
        }));
        throw error;
      });
  },

  updateTicketStatus: async (id: string, status: TicketStatus) => {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'tickets', id);
    updateDoc(docRef, { status })
      .catch(async () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: `tickets/${id}`,
          operation: 'update',
          requestResourceData: { status }
        }));
      });
  },

  getMessagesByConversation: async (conversationId: string) => {
    const firestore = getFirestore();
    // In this schema, messages are subcollections of tickets
    // For simplicity, we query across all tickets for messages matching conversationId
    // In production, you'd likely fetch from a specific ticket
    const q = query(collection(firestore, 'messages'), where('conversationId', '==', conversationId), orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(), 
      createdAt: doc.data().createdAt?.toDate() || new Date() 
    } as Message));
  },

  createMessage: async (msg: Omit<Message, 'id' | 'createdAt'>) => {
    const firestore = getFirestore();
    const messagesRef = collection(firestore, 'messages');
    const data = {
      ...msg,
      createdAt: serverTimestamp()
    };

    return addDoc(messagesRef, data)
      .then(docRef => ({ id: docRef.id, ...msg, createdAt: new Date() }))
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'messages',
          operation: 'create',
          requestResourceData: data
        }));
        throw error;
      });
  },

  getEscalations: async () => {
    const firestore = getFirestore();
    const snapshot = await getDocs(query(collection(firestore, 'escalations'), orderBy('escalatedAt', 'desc')));
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(), 
      escalatedAt: doc.data().escalatedAt?.toDate() || new Date() 
    } as Escalation));
  },

  createEscalation: async (esc: Omit<Escalation, 'id' | 'escalatedAt'>) => {
    const firestore = getFirestore();
    const escalationsRef = collection(firestore, 'escalations');
    const data = {
      ...esc,
      escalatedAt: serverTimestamp()
    };

    return addDoc(escalationsRef, data)
      .then(docRef => ({ id: docRef.id, ...esc, escalatedAt: new Date() }))
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'escalations',
          operation: 'create',
          requestResourceData: data
        }));
        throw error;
      });
  }
};
