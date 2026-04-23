
"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { db } from "@/lib/db"
import { Ticket, Message } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Mail,
  Send
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

export default function TicketDetailPage() {
  const { ticketId } = useParams()
  const router = useRouter()
  const [ticket, setTicket] = React.useState<Ticket | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [reply, setReply] = React.useState("")
  const [isSending, setIsSending] = React.useState(false)

  React.useEffect(() => {
    if (typeof ticketId === 'string') {
      db.getTicketById(ticketId).then(setTicket)
      // In a real app we'd use the conversationId from the ticket
      db.getMessagesByConversation('conv-1').then(setMessages)
    }
  }, [ticketId])

  const handleSendReply = () => {
    if (!reply.trim() || !ticket) return
    setIsSending(true)
    
    db.createMessage({
      conversationId: ticket.conversationId,
      channel: ticket.sourceChannel,
      direction: 'outbound',
      role: 'agent',
      content: reply,
      sentiment: 'neutral',
      sentimentScore: 0
    }).then(newMsg => {
      setMessages(prev => [...prev, newMsg as Message])
      setReply("")
      setIsSending(false)
    })
  }

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground font-medium">Loading ticket details...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Tickets
        </Button>
        <div className="flex gap-2">
          {ticket.status !== 'resolved' && (
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                db.updateTicketStatus(ticket.id, 'resolved')
                setTicket({ ...ticket, status: 'resolved' })
              }}
            >
              Mark as Resolved
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Conversation */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl flex flex-col h-[700px]">
            <CardHeader className="border-b bg-secondary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg font-headline">Conversation Thread</CardTitle>
                </div>
                <Badge variant="outline" className="capitalize">{ticket.sourceChannel.replace('_', ' ')}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.direction === 'outbound' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                      {msg.role === 'customer' ? 'Customer' : 'AI Agent'}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div 
                    className={cn(
                      "p-4 rounded-2xl text-sm shadow-sm",
                      msg.direction === 'outbound' 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-secondary/50 text-foreground rounded-tl-none border"
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.sentiment && msg.direction === 'inbound' && (
                    <div className="mt-1 flex gap-2">
                      <Badge className={cn(
                        "text-[9px] h-4 px-1.5",
                        msg.sentiment === 'positive' ? "bg-green-100 text-green-700" : 
                        msg.sentiment === 'negative' ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                      )}>
                        {msg.sentiment.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t p-6">
              <div className="w-full space-y-4">
                <Textarea 
                  placeholder="Type your response here..." 
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="min-h-[100px] resize-none border-secondary focus-visible:ring-accent"
                />
                <div className="flex justify-end">
                  <Button 
                    className="bg-accent hover:bg-accent/90 gap-2"
                    disabled={isSending || !reply.trim()}
                    onClick={handleSendReply}
                  >
                    {isSending ? "Sending..." : "Send Response"}
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column: Ticket Metadata */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-primary text-white p-6">
              <p className="text-xs font-mono opacity-80">{ticket.id}</p>
              <CardTitle className="text-xl font-headline mt-1">{ticket.subject}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Status</span>
                  <Badge className={cn(
                    "capitalize",
                    ticket.status === 'open' ? "bg-blue-600" :
                    ticket.status === 'escalated' ? "bg-destructive" :
                    ticket.status === 'resolved' ? "bg-green-600" : "bg-secondary"
                  )}>
                    {ticket.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Priority</span>
                  <Badge variant="outline" className={cn(
                    "capitalize",
                    ticket.priority === 'high' ? "text-red-600 border-red-200 bg-red-50" :
                    ticket.priority === 'medium' ? "text-orange-600 border-orange-200 bg-orange-50" : "text-blue-600 border-blue-200 bg-blue-50"
                  )}>
                    {ticket.priority}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Category</span>
                  <span className="text-sm font-semibold">{ticket.category}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Customer Info</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Customer ID: {ticket.customerId}</p>
                      <p className="text-xs text-muted-foreground">Channel: {ticket.sourceChannel}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Timeline</p>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs font-medium">Created</p>
                      <p className="text-xs text-muted-foreground">{new Date(ticket.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {ticket.status === 'escalated' && (
            <Card className="border-destructive bg-destructive/5 border-dashed">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-4 w-4" /> AI Escalation Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-xs text-destructive/80 leading-relaxed">
                  This ticket was automatically escalated because the customer mentioned legal action or exhibited high frustration scores.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
