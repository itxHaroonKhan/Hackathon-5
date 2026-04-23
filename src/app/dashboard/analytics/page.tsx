
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts"
import { Brain, Heart, Clock, Zap, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const sentimentData = [
  { name: 'Positive', value: 65, color: '#22c55e' },
  { name: 'Neutral', value: 25, color: '#94a3b8' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const efficiencyData = [
  { hour: '00:00', load: 12, speed: 1.1 },
  { hour: '04:00', load: 8, speed: 0.9 },
  { hour: '08:00', load: 45, speed: 2.1 },
  { hour: '12:00', load: 68, speed: 2.8 },
  { hour: '16:00', load: 52, speed: 2.2 },
  { hour: '20:00', load: 31, speed: 1.5 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Intelligence Analytics</h1>
          <p className="text-muted-foreground mt-1 text-lg">Deep insights into Digital FTE performance and customer emotion.</p>
        </div>
        <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-xl text-accent font-bold border border-accent/20">
          <Brain className="h-5 w-5" /> AI Efficiency: 94%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Avg Sentiment Score", value: "0.82", icon: Heart, color: "text-red-500", bg: "bg-red-50", desc: "Consistently positive" },
          { label: "AI Response Time", value: "1.4s", icon: Zap, color: "text-accent", bg: "bg-accent/10", desc: "Sub-second processing" },
          { label: "Auto-Resolution Rate", value: "78%", icon: Target, color: "text-green-600", bg: "bg-green-50", desc: "Top tier efficiency" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Trending Up
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-3xl font-headline font-bold">{stat.value}</h4>
                <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground opacity-60 mt-2">{stat.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-primary/5 p-8 border-b">
            <CardTitle className="font-headline text-xl">Customer Sentiment Profile</CardTitle>
            <CardDescription>Automated sentiment analysis from all communication channels.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-6">
                {sentimentData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full" style={{backgroundColor: item.color}} />
                      <span className="font-bold">{item.name}</span>
                    </div>
                    <span className="text-muted-foreground font-mono">{item.value}%</span>
                  </div>
                ))}
                <div className="pt-6 border-t">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Powered by <strong>analyzeCustomerSentiment</strong> flow. Processing 1,200+ samples per hour.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-primary/5 p-8 border-b">
            <CardTitle className="font-headline text-xl">Worker Performance Cluster</CardTitle>
            <CardDescription>Response speed relative to incoming message load.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={efficiencyData}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#456799" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#456799" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="load" stroke="#456799" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={3} />
                  <Line type="monotone" dataKey="speed" stroke="#29B4D5" strokeWidth={3} dot={{r: 4}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 flex justify-center gap-8 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-primary" /> System Load</div>
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-accent" /> Worker Speed</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
