"use client"

import Image from "next/image"

export function AboutFounder() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Photo */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Decorative background element */}
            <div 
              className="absolute top-4 -left-4 lg:left-8 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] rounded-full border-[3px] border-cyan-accent/15"
              aria-hidden="true"
            />
            <div 
              className="absolute -bottom-2 right-4 lg:right-auto lg:left-24 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full bg-cyan-accent/10"
              aria-hidden="true"
            />
            
            {/* Profile Image */}
            <div className="relative z-10">
              <Image
                src="/founder.png"
                alt="Nkemjika (Jude) Okeke - Founder of TurboData Analytics"
                width={420}
                height={420}
                className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[3/4] object-cover rounded-2xl"
                priority
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="lg:pl-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-cyan-accent mb-4">
              About the Founder
            </p>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-near-black mb-8">
              The person behind the numbers.
            </h2>
            
            <div className="space-y-5 text-[17px] leading-[1.75] text-[#3A3A4A]">
              <p>
                I am Nkemjika (Jude) Okeke — a business analytics and transformation consultant with a career built across logistics, manufacturing, banking, and FMCG in some of West Africa&apos;s most demanding operating environments, including First Aluminum Nigeria, a Rio Tinto Alcan subsidiary.
              </p>
              
              <p>
                Working across industries on two continents taught me something that stuck: the businesses that grow fastest aren&apos;t always the ones with the best products or the hardest-working teams — they&apos;re the ones that can see their own numbers clearly and act on them quickly.
              </p>
              
              <p>
                TurboData Analytics exists because of that gap. It is for the business owner who is working hard but not seeing the returns that effort deserves. My approach is direct: I come into your business, I look at what is actually happening in your numbers and your operations, and I tell you the truth — then we fix it together.
              </p>
              
              <p>
                I hold an MBA from Quantic School of Business, a Financial Modeling Certificate from the Corporate Finance Institute, and a certification in Marketing Analytics. I work with business owners who are ready to trade guesswork for clarity — and see real movement in their numbers.
              </p>
            </div>

            {/* Credential Badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#F0F2F8] text-[#1A1A2E] text-sm font-medium border border-[#E0E4F0]">
                MBA · Quantic School of Business
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#F0F2F8] text-[#1A1A2E] text-sm font-medium border border-[#E0E4F0]">
                Financial Modeling · CFI
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#F0F2F8] text-[#1A1A2E] text-sm font-medium border border-[#E0E4F0]">
                Marketing Analytics · Certified
              </span>
            </div>

            {/* CTA Link */}
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 mt-8 text-cyan-accent font-semibold hover:underline underline-offset-4 transition-all"
            >
              Work with Jude
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
