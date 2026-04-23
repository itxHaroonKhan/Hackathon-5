
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Ticket, 
  Users, 
  MessageSquare, 
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from "recharts"

const stats = [
  { label: "Active Tickets", value: "24", icon: Ticket, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Unified Customers", value: "1,284", icon: Users, color: "text-accent", bg: "bg-accent/10" },
  { label: "Total Conversations", value: "8,432", icon: MessageSquare, color: "text-green-600", bg: "bg-green-50" },
  { label: "Escalated to Human", value: "12", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
]

const chartData = [
  { name: "Mon", tickets: 45, latency: 1.2 },
  { name: "Tue", tickets: 52, latency: 1.5 },
  { name: "Wed", tickets: 38, latency: 0.8 },
  { name: "Thu", tickets: 65, latency: 2.1 },
  { name: "Fri", tickets: 48, latency: 1.4 },
  { name: "Sat", tickets: 24, latency: 0.6 },
  { name: "Sun", tickets: 31, latency: 0.9 },
]

const channelDistribution = [
  { name: "Email", value: 45, color: "#456799" },
  { name: "WhatsApp", value: 30, color: "#29B4D5" },
  { name: "Web Form", value: 25, color: "#6366f1" },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">System Overview</h1>
        <p className="text-muted-foreground mt-1 text-lg">Real-time performance metrics for your Digital FTE.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div className="text-xs font-semibold text-green-600 flex items-center bg-green-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12%
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-headline font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-primary/5 p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-headline text-xl">FTE Response Activity</CardTitle>
                <CardDescription>Daily volume vs Processing Latency</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <div className="h-3 w-3 rounded-full bg-primary" /> Volume
                </div>
                <div className="flex items-center gap-2 text-xs font-medium">
                  <div className="h-3 w-3 rounded-full bg-accent" /> Latency (s)
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                  />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="tickets" fill="#456799" radius={[4, 4, 0, 0]} barSize={40} />
                  <Bar dataKey="latency" fill="#29B4D5" radius={[4, 4, 0, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl overflow-hidden">
          <CardHeader className="p-6 border-b bg-primary/5">
            <CardTitle className="font-headline text-xl">Channel Distribution</CardTitle>
            <CardDescription>Incoming request source spread</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              {channelDistribution.map((channel, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{channel.name}</span>
                    <span className="text-muted-foreground">{channel.value}%</span>
                  </div>
                  <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000" 
                      style={{ 
                        width: `${channel.value}%`, 
                        backgroundColor: channel.color 
                      }} 
                    />
                  </div>
                </div>
              ))}
              
              <div className="pt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex flex-col items-center">
                  <Clock className="h-5 w-5 text-accent mb-2" />
                  <span className="text-xs text-muted-foreground font-medium">Avg Resolution</span>
                  <span className="text-lg font-bold">14m 22s</span>
                </div>
                <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex flex-col items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mb-2" />
                  <span className="text-xs text-muted-foreground font-medium">CSAT Score</span>
                  <span className="text-lg font-bold">4.8 / 5.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">Recent High-Priority Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "TKT-1024", subject: "Critical: Database connection drops", user: "dev_team@corp.com", time: "12m ago" },
                { id: "TKT-1025", subject: "Billing Error on Enterprise Plan", user: "accounting@large.io", time: "28m ago" },
                { id: "TKT-1028", subject: "Urgent: Password reset loop", user: "admin@startup.com", time: "1h ago" },
              ].map((ticket, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
                      HI
                    </div>
                    <div>
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground">{ticket.user} • {ticket.id}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{ticket.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">Cross-Channel Sentiment Trend</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                  />
                  <Line type="monotone" dataKey="latency" stroke="#29B4D5" strokeWidth={3} dot={{r: 4, fill: '#29B4D5'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Customer sentiment scores derived automatically via <strong>ai-customer-sentiment-analysis</strong> flow.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
