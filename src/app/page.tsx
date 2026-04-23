import { SupportForm } from "@/components/support-form"
import Link from "next/link"
import { ShieldCheck, Zap, Globe, MessageSquareText } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-headline font-bold text-xl">
              O
            </div>
            <span className="font-headline font-bold text-xl text-primary tracking-tight">OmniFTE Connect</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="hover:text-accent transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-accent transition-colors">Solutions</Link>
            <Link href="/dashboard" className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 transition-all shadow-lg">Agent Login</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-b from-white to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm">
                  Powered by GenAI Multi-Channel Factory
                </div>
                <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-primary">
                  The 24/7 Digital Employee <span className="text-accent">Built for Scale</span>.
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Incubate, specialize, and deploy production-grade AI agents that handle customer inquiries across Email, WhatsApp, and Web autonomously.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="#form" className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">Get Started Now</Link>
                  <Link href="#features" className="px-8 py-4 bg-white text-primary border-2 border-primary/20 rounded-xl font-bold text-lg hover:bg-secondary transition-all">Explore Platform</Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-accent/30 blur-3xl rounded-full" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-4 border border-border/50">
                  <img 
                    src="https://picsum.photos/seed/OmniFTE/800/600" 
                    alt="AI Support Dashboard" 
                    className="rounded-xl w-full h-auto"
                    data-ai-hint="dashboard workspace"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-bold text-primary">Intelligent Omnichannel Intake</h2>
              <p className="text-muted-foreground text-lg">Our Digital FTE works where your customers are, maintaining context across every touchpoint.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Universal Ticket Ingestion", desc: "Unified processing of incoming requests via Kafka from Gmail, WhatsApp, and Web.", icon: Globe },
                { title: "AI-Driven Sentiment Analysis", desc: "Real-time emotional tracking to detect frustration and trigger instant escalation.", icon: Zap },
                { title: "Production-Grade Security", desc: "Enterprise guardrails and Postgres-backed CRM for data integrity and privacy.", icon: ShieldCheck },
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl border bg-background hover:shadow-lg transition-all space-y-4 group">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Form Section */}
        <section id="form" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-2 space-y-8">
                <div className="p-2 w-fit rounded-lg bg-accent text-white">
                  <MessageSquareText className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-headline font-bold text-primary leading-tight">
                  Reach our support team in seconds.
                </h2>
                <div className="space-y-6">
                  {[
                    "Instant AI-generated confirmation message",
                    "Real-time tracking for every submission",
                    "Continuous context across all your channels",
                    "Intelligent triage to human agents for complex issues"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <span className="text-muted-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <SupportForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-primary font-headline font-bold text-xl">
                  O
                </div>
                <span className="font-headline font-bold text-xl tracking-tight">OmniFTE Connect</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Building the future of digital workforce specialization through advanced GenAI automation and multi-channel integration.
              </p>
            </div>
            {/* Mock footer columns */}
            {["Platform", "Resources", "Company"].map((col, i) => (
              <div key={i} className="space-y-4">
                <h4 className="font-bold font-headline">{col}</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="#" className="hover:text-accent transition-colors">Link Item One</Link></li>
                  <li><Link href="#" className="hover:text-accent transition-colors">Link Item Two</Link></li>
                  <li><Link href="#" className="hover:text-accent transition-colors">Link Item Three</Link></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 flex flex-col md:row justify-between items-center gap-4 text-white/40 text-xs">
            <p>© 2025 OmniFTE Factory. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
