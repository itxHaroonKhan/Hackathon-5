"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  MessageSquare, 
  Mail,
  RefreshCcw,
  Zap
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function TicketStatusPage() {
  const { ticketId } = useParams()
  const router = useRouter()
  const [progress, setProgress] = React.useState(33)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-3xl space-y-8">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/')}
          className="group hover:bg-white/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Button>

        <Card className="border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-primary text-white p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                  In Queue
                </div>
                <CardTitle className="text-4xl font-headline font-bold">Request #{ticketId}</CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  Submitted Today at {new Date().toLocaleTimeString()}
                </CardDescription>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                <p className="text-xs uppercase font-bold opacity-60">Estimated Time</p>
                <p className="text-2xl font-bold">5-10 mins</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-primary">
                <span>Processing Status</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-4 bg-secondary rounded-full" />
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="h-10 w-10 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-primary">Received</p>
                </div>
                <div className="text-center space-y-2">
                  <div className={cn("h-10 w-10 rounded-full flex items-center justify-center mx-auto shadow-lg transition-all", progress >= 66 ? "bg-accent text-white" : "bg-secondary text-muted-foreground")}>
                    <RefreshCcw className={cn("h-5 w-5", progress >= 66 ? "animate-spin-slow" : "")} />
                  </div>
                  <p className="text-xs font-bold text-muted-foreground">AI Triage</p>
                </div>
                <div className="text-center space-y-2 opacity-30">
                  <div className="h-10 w-10 bg-secondary text-muted-foreground rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-muted-foreground">Resolved</p>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 rounded-3xl p-8 border border-accent/10 space-y-4">
              <div className="flex items-center gap-3 text-accent font-bold">
                <Zap className="h-6 w-6" /> AI Response Update
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground italic">
                "Our Digital FTE has categorized your request as <strong>Technical Support</strong>. We've matched your issue with our internal documentation and an automated response is being generated. You should receive a detailed guide in your email shortly."
              </p>
            </div>

            <div className="pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Check your Inbox</h4>
                  <p className="text-sm text-muted-foreground">We'll send the final resolution to your registered email address.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Add Details?</h4>
                  <p className="text-sm text-muted-foreground">Need to add more context? Just reply to our confirmation email.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          OmniFTE Connect production agent v2.0.0
        </p>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
