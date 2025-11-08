"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Sparkles, 
  Rocket, 
  Shield, 
  Code, 
  TrendingUp, 
  Target,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Send
} from "lucide-react"

// Service Card Component
export function ServiceCard({ 
  title, 
  description, 
  icon = "Sparkles",
  features = [],
  ctaText = "Learn More",
  ctaAction
}: {
  title: string
  description: string
  icon?: string
  features?: string[]
  ctaText?: string
  ctaAction?: () => void
}) {
  const iconMap: Record<string, any> = {
    Sparkles, Rocket, Shield, Code, TrendingUp, Target
  }
  
  const Icon = iconMap[icon] || Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        {features.length > 0 && (
          <CardContent>
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            {ctaText && (
              <Button 
                onClick={ctaAction}
                className="w-full mt-4 bg-primary hover:bg-primary/90"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}

// Pricing Card Component
export function PricingCard({
  title,
  price,
  period = "month",
  description,
  features = [],
  recommended = false,
  ctaText = "Get Started",
  ctaAction
}: {
  title: string
  price: string
  period?: string
  description?: string
  features?: string[]
  recommended?: boolean
  ctaText?: string
  ctaAction?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`relative ${recommended ? 'border-primary shadow-lg shadow-primary/20' : 'border-primary/20'}`}>
        {recommended && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
          </div>
        )}
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-2">{description}</CardDescription>
          )}
          <div className="mt-4">
            <span className="text-4xl font-bold text-primary">{price}</span>
            <span className="text-muted-foreground">/{period}</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 mb-6">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            onClick={ctaAction}
            className={`w-full ${recommended ? 'bg-primary hover:bg-primary/90' : ''}`}
            variant={recommended ? 'default' : 'outline'}
          >
            {ctaText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Service Grid Component
export function ServiceGrid({ 
  services 
}: { 
  services: Array<{
    title: string
    description: string
    icon?: string
  }> 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {services.map((service, idx) => (
        <ServiceCard key={idx} {...service} />
      ))}
    </div>
  )
}

// Quick Actions Component
export function QuickActions({ 
  actions 
}: { 
  actions: Array<{
    label: string
    icon?: string
    action?: string
  }> 
}) {
  const iconMap: Record<string, any> = {
    Mail, Phone, Calendar, Rocket, Target
  }

  return (
    <div className="flex flex-wrap gap-2 my-3">
      {actions.map((action, idx) => {
        const Icon = action.icon ? iconMap[action.icon] : ArrowRight
        return (
          <Button
            key={idx}
            variant="outline"
            size="sm"
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {action.label}
          </Button>
        )
      })}
    </div>
  )
}

// Info Card Component
export function InfoCard({
  title,
  content,
  type = "info"
}: {
  title?: string
  content: string
  type?: "info" | "warning" | "success" | "tip"
}) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-300",
    success: "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300",
    tip: "bg-primary/10 border-primary/30 text-primary"
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-lg border-2 p-4 my-3 ${styles[type]}`}
    >
      {title && <p className="font-semibold mb-1">{title}</p>}
      <p className="text-sm">{content}</p>
    </motion.div>
  )
}

// Stats Display Component
export function StatsDisplay({
  stats
}: {
  stats: Array<{
    label: string
    value: string
    change?: string
  }>
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="border-primary/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            {stat.change && (
              <p className="text-xs text-green-500 mt-1">{stat.change}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Contact CTA Component
export function ContactCTA({
  title = "Ready to Get Started?",
  description = "Let's discuss your project and how we can help.",
  primaryButtonText = "Contact Us",
  secondaryButtonText = "View Services"
}: {
  title?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 my-4">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button className="bg-primary hover:bg-primary/90">
              {primaryButtonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-primary/30">
              {secondaryButtonText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Contact Form Component
export function ContactForm({
  title = "Get in Touch",
  description = "Fill out the form below and we'll get back to you soon.",
  fields = ["name", "email", "phone", "message"],
  submitText = "Send Message"
}: {
  title?: string
  description?: string
  fields?: Array<"name" | "email" | "phone" | "company" | "message">
  submitText?: string
}) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(false)
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name || "Not provided",
          email: formData.email || "Not provided",
          phone: formData.phone || "Not provided",
          company: formData.company || "Not provided",
          message: formData.message || "Not provided",
          subject: `New Chat Contact Form from ${formData.name || "Unknown"}`,
          from_name: "Fluxive Chat Widget"
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitting(false)
        setSubmitted(true)
        
        // Keep success message visible, don't reset
        setTimeout(() => {
          setSubmitted(false)
          setFormData({})
        }, 5000)
      } else {
        throw new Error("Submission failed")
      }
    } catch (err) {
      setIsSubmitting(false)
      setError(true)
      
      // Hide error after 5 seconds
      setTimeout(() => {
        setError(false)
      }, 5000)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="border-red-500/30 bg-red-500/10 my-4">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
              Something went wrong
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Please try again or contact us directly at info@fluxive.be
            </p>
            <Button 
              onClick={() => setError(false)}
              variant="outline"
              className="mt-4 border-red-500/30"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="border-green-500/30 bg-green-500/10 my-4">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
              Message Sent Successfully! 🎉
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-primary/20 my-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.includes("name") && (
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
            )}
            
            {fields.includes("email") && (
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
            )}
            
            {fields.includes("phone") && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
            )}
            
            {fields.includes("company") && (
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Your company"
                  value={formData.company || ""}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
            )}
            
            {fields.includes("message") && (
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  required
                  rows={4}
                  value={formData.message || ""}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="border-primary/20 focus:border-primary resize-none"
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  {submitText}
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
