"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const benefits = [
  "A 5-section business diagnostic framework",
  "Key questions your financial statements aren't asking",
  "A scoring guide to prioritise your biggest opportunities",
]

export function LeadMagnet() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    industry: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setFormData({ fullName: "", email: "", industry: "" })
  }

  return (
    <section id="lead-magnet" className="py-24 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-cyan-accent mb-4">
              Free Resource
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground text-balance">
              Download the Business Profit Leak Audit
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-[600px] leading-relaxed">
              A structured self-assessment tool that helps SME owners identify exactly where their business is losing money — before they spend a dollar on consulting. Used by business owners in manufacturing, retail, logistics, and professional services.
            </p>
            
            <p className="mt-8 text-sm font-semibold text-primary-foreground mb-4">
              {"What's inside:"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-cyan-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-cyan-accent" />
                  </div>
                  <span className="text-sm text-primary-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-card rounded-xl p-8 shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-cyan-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-cyan-accent" />
                </div>
                <h3 className="text-xl font-semibold text-near-black">Thanks!</h3>
                <p className="mt-2 text-muted-foreground">
                  {"We'll be in touch within 1 business day."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-near-black mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-near-black placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-near-black mb-2">
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-near-black placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-near-black mb-2">
                    Industry / Business Type
                  </label>
                  <input
                    type="text"
                    id="industry"
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-near-black placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    placeholder="Manufacturing, Retail, etc."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary-blue text-primary-foreground font-bold text-base rounded-full hover:bg-primary-blue-hover transition-colors"
                >
                  Download Now
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  We don&apos;t spam. Your data is never sold.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
