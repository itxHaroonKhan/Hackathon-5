"use client"

import * as React from "react"
import { db } from "@/lib/db"
import { Escalation, Ticket } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  AlertTriangle, 
  MessageSquare, 
  UserCircle, 
  History,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react"
import { aiEscalationContext } from "@/ai/flows/ai-escalation-context"
import { useToast } from "@/hooks/use-toast"

export default function EscalationsPage() {
  const [escalations, setEscalations] = React.useState<Escalation[]>([])
  const [selectedEscalation, setSelectedEscalation] = React.useState<Escalation | null>(null)
  const [aiContext, setAiContext] = React.useState<{ reason: string; summary: string } | null>(null)
  const [isLoadingContext, setIsLoadingContext] = React.useState(false)
  const { toast } = useToast()

  React.useEffect(() => {
    db.getEscalations().then(data => {
      setEscalations(data)
      if (data.length > 0) handleSelectEscalation(data[0])
    })
  }, [])

  async function handleSelectEscalation(esc: Escalation) {
    setSelectedEscalation(esc)
    setIsLoadingContext(true)
    setAiContext(null)
    
    try {
      // Fetch AI escalation context from flow
      // Note: Flow requires a real ticketId that exists in its mock db
      // We'll use a hardcoded one for the demo or try the real one
      const flowId = esc.ticketId === 'TKT-1002' ? 'ticket-123' : 'ticket-789'
      const context = await aiEscalationContext({ ticketId: flowId })
      setAiContext({
        reason: context.escalationReason,
        summary: context.conversationSummary
      })
    } catch (err) {
      console.error("Failed to load AI context", err)
      toast({
        variant: "destructive",
        title: "Context Failed",
        description: "Could not retrieve AI escalation details."
      })
    } finally {
      setIsLoadingContext(false)
    }
  }

  function handleResolve(id: string) {
    toast({
      title: "Ticket Resolved",
      description: `Escalation for ticket ${id} has been marked as handled.`
    })
    setEscalations(prev => prev.filter(e => e.id !== id))
    setSelectedEscalation(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            Escalation Review
          </h1>
          <p className="text-muted-foreground mt-1">Human-in-the-loop intervention for flagged AI interactions.</p>
        </div>
        <Badge variant="destructive" className="h-8 px-4 text-sm">
          {escalations.length} Pending Actions
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Escalation List */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground px-1">Flagged Tickets</h3>
          {escalations.map((esc) => (
            <Card 
              key={esc.id} 
              className={`cursor-pointer transition-all border-none shadow-md hover:shadow-lg ${selectedEscalation?.id === esc.id ? 'ring-2 ring-destructive ring-offset-2' : ''}`}
              onClick={() => handleSelectEscalation(esc)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{esc.ticketId}</p>
                  <p className="text-xs text-muted-foreground">{new Date(esc.escalatedAt).toLocaleTimeString()}</p>
                </div>
                <Badge variant="outline" className="bg-destructive/5 text-[10px] text-destructive border-destructive/20">SENTIMENT: LOW</Badge>
              </CardContent>
            </Card>
          ))}
          {escalations.length === 0 && (
            <div className="text-center p-12 bg-white rounded-2xl border border-dashed text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500 opacity-20" />
              <p>No pending escalations found.</p>
            </div>
          )}
        </div>

        {/* Escalation Detail View */}
        <div className="lg:col-span-8">
          {selectedEscalation ? (
            <div className="space-y-6">
              <Card className="border-none shadow-xl overflow-hidden">
                <CardHeader className="bg-destructive/5 p-8 border-b">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">URGENT</Badge>
                        <span className="text-sm text-muted-foreground font-mono">{selectedEscalation.ticketId}</span>
                      </div>
                      <CardTitle className="text-2xl font-headline mt-2">AI Hand-off: {selectedEscalation.reason}</CardTitle>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>Escalated at</p>
                      <p className="font-bold text-destructive">{new Date(selectedEscalation.escalatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* AI Context Section */}
                  <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Loader2 className="h-24 w-24 text-accent" />
                    </div>
                    <h4 className="flex items-center gap-2 text-accent font-bold mb-4">
                      <History className="h-5 w-5" /> AI Intelligence Report
                    </h4>
                    
                    {isLoadingContext ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin text-accent" />
                        <p className="text-sm text-accent font-medium">Analyzing conversation history...</p>
                      </div>
                    ) : aiContext ? (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <p className="text-xs font-bold uppercase text-accent/60">Reason for Escalation</p>
                          <p className="text-lg font-medium leading-relaxed">{aiContext.reason}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-bold uppercase text-accent/60">Conversation Summary</p>
                          <p className="text-muted-foreground leading-relaxed italic">{aiContext.summary}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Select an escalation to view AI reasoning.</p>
                    )}
                  </div>

                  {/* Message History Preview */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold">
                      <MessageSquare className="h-5 w-5" /> Last Messages
                    </h4>
                    <div className="space-y-4 border rounded-2xl p-6 bg-secondary/20">
                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <UserCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-muted-foreground mb-1">Customer (WhatsApp)</p>
                          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm inline-block border text-sm">
                            I already looked, I cannot find the refund policy link. Please tell me directly what it is. I am contacting my legal team if this isn't resolved today.
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 flex-row-reverse">
                        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                          AI
                        </div>
                        <div className="flex-1 text-right">
                          <p className="text-xs font-bold text-muted-foreground mb-1">OmniFTE Agent</p>
                          <div className="bg-accent text-white p-3 rounded-2xl rounded-tr-none shadow-sm inline-block text-sm">
                            I apologize, I am having trouble locating the specific document for you. Would you like me to escalate this to a human agent?
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 flex gap-4">
                  <Button className="flex-1 h-12 bg-primary hover:bg-primary/90" onClick={() => handleResolve(selectedEscalation.ticketId)}>
                    Take Over Conversation
                  </Button>
                  <Button variant="outline" className="h-12 border-destructive text-destructive hover:bg-destructive/5" onClick={() => handleResolve(selectedEscalation.ticketId)}>
                    Dismiss & Auto-Resolve
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
              <History className="h-16 w-16 mb-4 opacity-10" />
              <h3 className="text-xl font-headline font-bold">Select an escalation to begin review</h3>
              <p className="max-w-xs mt-2">AI-flagged tickets require human oversight to ensure high-quality resolution of complex issues.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
