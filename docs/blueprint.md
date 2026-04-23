# **App Name**: OmniFTE Connect

## Core Features:

- Web Inquiry Form: A publicly accessible Next.js form allowing customers to submit detailed support inquiries, including client-side validation and real-time status updates on their submission.
- AI-Driven Response Tracker: Users who submit the web form can track the status of their query and estimated response time, receiving an AI-generated confirmation of their submission.
- Unified Customer Profile Viewer: For internal agents to search for customers by email or phone and view their aggregated profile, including cross-channel identifiers stored in the PostgreSQL CRM.
- Full Conversation History Access: Display an entire conversation thread for a customer, including messages from email, WhatsApp, and web form, ensuring cross-channel continuity within the PostgreSQL CRM.
- Dynamic Support Ticket Dashboard: An internal dashboard presenting a list of all active and resolved support tickets, filterable by status, channel, and priority, stored in the PostgreSQL CRM.
- Live Agent Performance Analytics: Visualize real-time and historical performance metrics of the AI agent, including response times, accuracy rates, and a breakdown of customer sentiment (an AI-derived metric) from the PostgreSQL CRM.
- AI Escalation Review Tool: Provide an interface for human agents to review and take over support tickets that the AI has intelligently flagged for escalation, including the AI's reason for escalation, enabling rapid human intervention.

## Style Guidelines:

- Primary color: A professional and calming blue (#456799), chosen to convey intelligence, trustworthiness, and efficiency for a sophisticated AI-powered customer success platform.
- Background color: A very light, subtle bluish-gray (#F0F3F6), providing a clean and approachable canvas that enhances readability in a light color scheme.
- Accent color: A vibrant cyan (#29B4D5), used for interactive elements and highlights, selected to provide clear visual cues and a modern, tech-forward aesthetic that contrasts effectively with the primary palette.
- Headlines: 'Space Grotesk' (sans-serif) for a distinctive, tech-infused yet readable presence, aligning with the app's AI and production-grade themes.
- Body text: 'Inter' (sans-serif) for clear readability across various text lengths and its modern, neutral, and objective aesthetic, complementing the headline font.
- Utilize a consistent set of minimal, outline-style SVG icons. Icons should be clear and intuitive, supporting quick navigation and status comprehension without visual clutter. Prioritize functional representation.
- Implement a clean, organized, and responsive grid-based layout. Information should be presented with clear hierarchy and ample whitespace to prevent cognitive overload, adaptable to all device sizes.
- Incorporate subtle, performant animations for state changes (e.g., form submission, data loading, ticket status updates) and UI feedback. Animations should enhance user experience without being distracting, reinforcing the system's responsiveness.