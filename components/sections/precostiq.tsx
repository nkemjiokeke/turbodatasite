"use client"

import Link from "next/link"
import { Check } from "lucide-react"

function PreCostIQLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-xl bg-[#0F1F4A] flex items-center justify-center">
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 1L1 14H10L8.5 23L19 10H10L11.5 1Z" fill="#3B6FE8" stroke="#3B6FE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-[28px] font-bold">
        <span className="text-white">PreCost</span>
        <span className="text-[#3B6FE8]">IQ</span>
      </span>
    </div>
  )
}

function PhoneMockup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-[160px] rounded-[36px] border-[3px] border-[#1A1A2A] bg-dark-bg overflow-hidden shadow-2xl ${className}`}>
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}

function DashboardPhone() {
  return (
    <PhoneMockup>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-dark-card rounded-lg p-2">
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Revenue This Month</p>
            <p className="text-sm font-bold text-white">$892.07</p>
          </div>
          <div className="bg-dark-card rounded-lg p-2">
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Avg Margin</p>
            <p className="text-sm font-bold text-[#4ADE80]">30.0%</p>
          </div>
          <div className="bg-dark-card rounded-lg p-2">
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Total Jobs</p>
            <p className="text-sm font-bold text-white">3</p>
          </div>
          <div className="bg-dark-card rounded-lg p-2">
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Projects</p>
            <p className="text-sm font-bold text-white">1/3</p>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-2">
          <p className="text-[8px] text-white/50 uppercase mb-1">Project costs over time</p>
          <svg viewBox="0 0 120 40" className="w-full h-8">
            <polyline
              points="0,35 20,28 40,30 60,22 80,18 100,25 120,15"
              fill="none"
              stroke="#3B6FE8"
              strokeWidth="2"
            />
            <polyline
              points="0,30 20,32 40,25 60,28 80,20 100,22 120,18"
              fill="none"
              stroke="#00C8FF"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </PhoneMockup>
  )
}

function AnalyticsPhone() {
  return (
    <PhoneMockup className="relative -ml-8 mt-5">
      <div className="space-y-2">
        <div className="bg-dark-card rounded-lg p-2">
          <p className="text-[8px] text-white/50 uppercase mb-1">Jobs by status</p>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#1C2E5A" strokeWidth="6" />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#3B6FE8"
                strokeWidth="6"
                strokeDasharray="67 100"
                strokeDashoffset="25"
                transform="rotate(-90 20 20)"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#4ADE80"
                strokeWidth="6"
                strokeDasharray="33 100"
                strokeDashoffset="-42"
                transform="rotate(-90 20 20)"
              />
            </svg>
            <div className="text-[8px] space-y-0.5">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#3B6FE8]" />
                <span className="text-white/70">Open 2</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                <span className="text-white/70">Completed 1</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-2">
          <p className="text-[8px] text-white/50 uppercase mb-1">Margin by job</p>
          <div className="flex items-end gap-2 h-8">
            <div className="w-6 bg-[#4ADE80] rounded-t h-4" />
            <div className="w-6 bg-[#4ADE80] rounded-t h-7" />
            <div className="w-6 bg-[#4ADE80] rounded-t h-5" />
          </div>
        </div>
      </div>
    </PhoneMockup>
  )
}

export function PreCostIQ() {
  const features = [
    "Stop guessing on quotes.",
    "Describe the work in plain language.",
    "Get a full AI cost breakdown before you say yes.",
    "In under 2 minutes.",
  ]

  return (
    <section id="precostiq" className="bg-dark-bg py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Left Column - 60% */}
          <div className="lg:w-[60%]">
            <PreCostIQLogo />
            
            <div className="mt-2">
              <span className="inline-block bg-[#1A3A1A] text-[#4ADE80] text-xs px-3.5 py-1.5 rounded-full">
                A TurboData Analytics Product
              </span>
            </div>

            <h2 className="mt-6 text-[32px] sm:text-[40px] font-bold text-white leading-tight max-w-[520px]">
              Know your margin before you quote the job.
            </h2>

            <div className="mt-8 bg-dark-card border border-dark-border rounded-xl p-5 sm:p-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#3B6FE8] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://precostiq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#3B6FE8] hover:bg-[#2952C4] text-white font-semibold text-base px-8 py-3.5 rounded-full transition-colors"
              >
                Try PreCostIQ Free
              </Link>
              <Link
                href="https://precostiq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-[#3B6FE8] text-[#3B6FE8] hover:bg-[#3B6FE8] hover:text-white font-semibold text-base px-8 py-3.5 rounded-full transition-colors"
              >
                Learn More
              </Link>
            </div>

            <p className="mt-4 text-white/50 text-sm">
              Free plan available · No credit card required
            </p>
          </div>

          {/* Right Column - 40% (Desktop only) */}
          <div className="hidden lg:flex lg:w-[40%] justify-center">
            <div className="flex">
              <DashboardPhone />
              <AnalyticsPhone />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
