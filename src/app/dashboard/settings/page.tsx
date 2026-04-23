
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Shield, 
  Bot, 
  Bell, 
  Key,
  Database,
  Globe,
  Save
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">System Settings</h1>
        <p className="text-muted-foreground mt-1 text-lg">Configure your Digital FTE factory and agent behavior.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger value="general" className="gap-2"><Settings className="h-4 w-4" /> General</TabsTrigger>
          <TabsTrigger value="agent" className="gap-2"><Bot className="h-4 w-4" /> AI Agent</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2"><Database className="h-4 w-4" /> Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Global Configuration</CardTitle>
              <CardDescription>Basic organizational and system preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="TechCorp SaaS" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">System Timezone</Label>
                  <Input id="timezone" defaultValue="UTC (00:00)" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Multi-Channel Sync</Label>
                  <p className="text-sm text-muted-foreground">Keep customer context synchronized across all channels.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automated Archiving</Label>
                  <p className="text-sm text-muted-foreground">Archive resolved tickets after 30 days of inactivity.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agent">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Digital FTE Persona</CardTitle>
              <CardDescription>Control how the AI interacts with your customers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Response Style</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="border-primary text-primary font-bold">Concise & Professional</Button>
                  <Button variant="outline">Empathetic & Warm</Button>
                  <Button variant="outline">Detailed & Technical</Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Triage</Label>
                  <p className="text-sm text-muted-foreground">Allow AI to automatically categorize and prioritize tickets.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sentiment Escalation</Label>
                  <p className="text-sm text-muted-foreground">Instantly hand-off to human if sentiment score falls below -0.6.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent-name">Agent Display Name</Label>
                <Input id="agent-name" defaultValue="OmniFTE Assistant" />
                <p className="text-xs text-muted-foreground italic">Visible to customers in chat channels like WhatsApp.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Privacy & Data Safety</CardTitle>
              <CardDescription>Manage keys, encryption, and access controls.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-bold">Google AI API Key</p>
                      <p className="text-xs text-muted-foreground">Used for Genkit flows and model evaluation.</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">ACTIVE</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-bold">PII Redaction</p>
                      <p className="text-xs text-muted-foreground">Automatically hide sensitive data in logs.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Channel Connectors</CardTitle>
              <CardDescription>Connect external services to the Digital FTE pipeline.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Gmail API", status: "Connected", icon: Globe, color: "text-red-500" },
                { name: "WhatsApp Business", status: "Pending", icon: Bell, color: "text-green-500" },
                { name: "PostgreSQL Production", status: "Connected", icon: Database, color: "text-blue-500" },
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <service.icon className={cn("h-5 w-5", service.color)} />
                    <span className="font-bold">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground font-medium">{service.status}</span>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" className="h-12 px-8">Discard Changes</Button>
        <Button className="h-12 px-8 bg-primary gap-2">
          <Save className="h-4 w-4" /> Save All Settings
        </Button>
      </div>
    </div>
  )
}

function Separator() {
  return <div className="h-px bg-border w-full" />
}
