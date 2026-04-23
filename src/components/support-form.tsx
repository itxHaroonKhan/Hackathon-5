"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react"
import { aiWebFormConfirmation } from "@/ai/flows/ai-web-form-confirmation-flow"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  category: z.string({ required_error: "Please select a category." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export function SupportForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [confirmationData, setConfirmationData] = React.useState<{ message: string; eta: string } | null>(null)
  const [ticketId, setTicketId] = React.useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "general",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // 1. Generate AI Confirmation via flow
      const aiResponse = await aiWebFormConfirmation(values)
      
      // 2. Mock ticket creation
      const mockId = `TKT-${Math.floor(Math.random() * 100000)}`
      setTicketId(mockId)
      
      setConfirmationData({
        message: aiResponse.confirmationMessage,
        eta: aiResponse.estimatedResponseTime,
      })
      
      setIsSuccess(true)
    } catch (error) {
      console.error("Submission failed", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess && confirmationData) {
    return (
      <Card className="w-full max-w-2xl mx-auto overflow-hidden border-none shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-accent p-6 flex items-center gap-4 text-white">
          <div className="bg-white/20 p-2 rounded-full">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-headline font-bold">Request Received</h2>
            <p className="text-sm opacity-90">Ticket ID: {ticketId}</p>
          </div>
        </div>
        <CardContent className="p-8 space-y-6">
          <div className="prose prose-blue dark:prose-invert">
            <p className="text-lg leading-relaxed">{confirmationData.message}</p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Estimated Response Time:</span>
            <span className="text-primary font-bold">{confirmationData.eta}</span>
          </div>
        </CardContent>
        <CardFooter className="p-8 pt-0 flex flex-col gap-4">
          <Button 
            className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all group"
            onClick={() => router.push(`/status/${ticketId}`)}
          >
            Track Status <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            A copy of this confirmation has been sent to your email.
          </p>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-none">
      <CardHeader className="space-y-1 p-8">
        <CardTitle className="text-3xl font-headline font-bold text-primary">Need Support?</CardTitle>
        <CardDescription className="text-lg">
          Our 24/7 Digital FTE is standing by to assist you.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="What can we help with?" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Subscription</SelectItem>
                        <SelectItem value="bug_report">Report a Bug</SelectItem>
                        <SelectItem value="feedback">Product Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide as much detail as possible..." 
                      className="min-h-[150px] resize-none p-4"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include steps to reproduce or account identifiers if applicable.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-accent hover:bg-accent/90 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Response...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
