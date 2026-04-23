"use client"

import * as React from "react"
import { db } from "@/lib/db"
import { Customer, Message } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  History, 
  MessageSquare,
  ChevronRight,
  User
} from "lucide-react"

export default function CustomersPage() {
  const [customers, setCustomers] = React.useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    db.getCustomers().then(setCustomers)
  }, [])

  async function handleSelectCustomer(customer: Customer) {
    setSelectedCustomer(customer)
    // In a real app, conversationId would be linked to active ticket
    const msgs = await db.getMessagesByConversation('conv-1')
    setMessages(msgs)
  }

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Customer Insights</h1>
          <p className="text-muted-foreground mt-1 text-lg">Cross-channel unified customer identity management.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Customer Directory */}
        <Card className="lg:col-span-4 border-none shadow-xl">
          <CardHeader className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search customers..." 
                className="pl-10 h-11"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2 max-h-[600px] overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div 
                key={customer.id}
                className={cn(
                  "p-4 rounded-xl cursor-pointer transition-all flex items-center justify-between group",
                  selectedCustomer?.id === customer.id ? "bg-primary text-white" : "hover:bg-secondary"
                )}
                onClick={() => handleSelectCustomer(customer)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold", 
                    selectedCustomer?.id === customer.id ? "bg-white/20" : "bg-primary/10 text-primary")}>
                    {customer.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{customer.name}</p>
                    <p className={cn("text-xs opacity-70")}>{customer.email}</p>
                  </div>
                </div>
                <ChevronRight className={cn("h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity")} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Customer Detail View */}
        <div className="lg:col-span-8">
          {selectedCustomer ? (
            <div className="space-y-6">
              <Card className="border-none shadow-xl overflow-hidden">
                <CardHeader className="bg-primary p-8 text-white">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl font-headline font-bold">
                      {selectedCustomer.name[0]}
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-3xl font-headline font-bold">{selectedCustomer.name}</h2>
                      <div className="flex flex-wrap gap-4 text-white/80 text-sm">
                        <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {selectedCustomer.email}</span>
                        {selectedCustomer.phone && <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {selectedCustomer.phone}</span>}
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined {new Date(selectedCustomer.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h4 className="flex items-center gap-2 font-bold text-lg text-primary">
                        <User className="h-5 w-5" /> Cross-Channel Profile
                      </h4>
                      <div className="space-y-4">
                        {[
                          { label: "Email Address", value: selectedCustomer.email, verified: true },
                          { label: "WhatsApp ID", value: selectedCustomer.phone || "Not linked", verified: !!selectedCustomer.phone },
                          { label: "Web Portal UID", value: selectedCustomer.id, verified: true },
                        ].map((id, i) => (
                          <div key={i} className="flex justify-between items-center p-4 rounded-xl border bg-secondary/20">
                            <div>
                              <p className="text-xs text-muted-foreground font-bold uppercase">{id.label}</p>
                              <p className="text-sm font-semibold">{id.value}</p>
                            </div>
                            <Badge variant={id.verified ? "default" : "secondary"} className={id.verified ? "bg-green-600 text-white border-none" : ""}>
                              {id.verified ? "VERIFIED" : "LINK"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="flex items-center gap-2 font-bold text-lg text-primary">
                        <History className="h-5 w-5" /> Quick Stats
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex flex-col items-center">
                          <span className="text-xs text-muted-foreground font-bold mb-1">Total Inquiries</span>
                          <span className="text-2xl font-bold">14</span>
                        </div>
                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex flex-col items-center">
                          <span className="text-xs text-muted-foreground font-bold mb-1">Open Tickets</span>
                          <span className="text-2xl font-bold text-accent">1</span>
                        </div>
                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex flex-col items-center col-span-2">
                          <span className="text-xs text-muted-foreground font-bold mb-1">Last Interaction</span>
                          <span className="text-lg font-bold">2 days ago via Email</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conversation History Preview */}
              <Card className="border-none shadow-xl">
                <CardHeader className="border-b p-6">
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <MessageSquare className="h-5 w-5 text-accent" /> Full Conversation History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y max-h-[400px] overflow-y-auto">
                    {messages.map((msg) => (
                      <div key={msg.id} className={cn("p-6 space-y-2 hover:bg-secondary/20 transition-all", msg.direction === 'outbound' ? 'bg-accent/5' : '')}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className={cn("text-xs font-bold uppercase", msg.role === 'customer' ? 'text-primary' : 'text-accent')}>
                              {msg.role}
                            </span>
                            <span className="text-[10px] text-muted-foreground border px-1.5 py-0.5 rounded capitalize">{msg.channel.replace('_', ' ')}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground">{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        {msg.sentiment && (
                          <div className="pt-2">
                            <Badge className={cn("text-[9px] h-4", msg.sentiment === 'positive' ? 'bg-green-100 text-green-700' : msg.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700')}>
                              SENTIMENT: {msg.sentiment.toUpperCase()} ({msg.sentimentScore})
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
              <User className="h-16 w-16 mb-4 opacity-10" />
              <h3 className="text-xl font-headline font-bold">Select a customer to view their cross-channel profile</h3>
              <p className="max-w-xs mt-2">OmniFTE Connect automatically merges identities across Email, WhatsApp, and Web based on email and phone identifiers.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
