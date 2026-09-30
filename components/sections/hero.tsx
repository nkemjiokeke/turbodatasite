import { MapPin } from "lucide-react"
import { ButtonLink, Container } from "@/components/site/primitives"
import { site } from "@/lib/site"

/** Abstract illustration: a business workflow with one leaking handoff, and a margin view by line.
 *  Deliberately contains no figures or results. */
function OperatingViewVisual() {
  const stages = ["Quote", "Schedule", "Deliver", "Invoice"]
  return (
    <svg
      viewBox="0 0 480 400"
      role="img"
      aria-label="Illustration of a business workflow from quote to invoice, with one handoff highlighted as a source of lost margin, above a simple comparison of margin by business line."
      className="h-auto w-full"
    >
      <rect x="0.5" y="0.5" width="479" height="399" rx="16" fill="#ffffff" stroke="#e2dfd6" />

      {/* Workflow */}
      <text x="28" y="44" fill="#3d4a5c" fontSize="13" fontWeight="600" fontFamily="inherit">
        How work moves through the business
      </text>
      {stages.map((label, i) => {
        const x = 28 + i * 110
        return (
          <g key={label}>
            <rect x={x} y="64" width="94" height="52" rx="10" fill="#f7f6f2" stroke="#cfccc2" />
            <text x={x + 47} y="95" textAnchor="middle" fill="#0f1b2d" fontSize="13" fontWeight="600" fontFamily="inherit">
              {label}
            </text>
            {i < stages.length - 1 && (
              <path
                d={`M${x + 94} 90 H${x + 110}`}
                stroke={i === 1 ? "#b45309" : "#0f766e"}
                strokeWidth="2"
                strokeDasharray={i === 1 ? "4 3" : undefined}
              />
            )}
          </g>
        )
      })}
      {/* Leak marker between Schedule and Deliver */}
      <g>
        <path d="M240 92 V154" stroke="#b45309" strokeWidth="2" strokeDasharray="3 3" fill="none" />
        <circle cx="240" cy="160" r="5" fill="#b45309" />
        <text x="254" y="164" fill="#8a3d06" fontSize="12" fontWeight="600" fontFamily="inherit">
          Rework and waiting time
        </text>
      </g>

      {/* Margin by line */}
      <line x1="28" y1="196" x2="452" y2="196" stroke="#e2dfd6" />
      <text x="28" y="228" fill="#3d4a5c" fontSize="13" fontWeight="600" fontFamily="inherit">
        Margin by business line
      </text>
      {[
        { label: "Line A", w: 300, c: "#0f766e" },
        { label: "Line B", w: 220, c: "#0f766e" },
        { label: "Line C", w: 150, c: "#0f766e" },
        { label: "Line D", w: 70, c: "#b45309" },
      ].map((row, i) => (
        <g key={row.label}>
          <text x="28" y={262 + i * 34} fill="#0f1b2d" fontSize="12" fontFamily="inherit">
            {row.label}
          </text>
          <rect x="88" y={250 + i * 34} width="340" height="16" rx="4" fill="#f1efe9" />
          <rect x="88" y={250 + i * 34} width={row.w} height="16" rx="4" fill={row.c} opacity={row.c === "#b45309" ? 1 : 0.85} />
        </g>
      ))}
      <text x="28" y="388" fill="#6b7280" fontSize="11" fontFamily="inherit">
        Illustrative only
      </text>
    </svg>
  )
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line bg-paper">
      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-semibold tracking-wide text-teal">
              Business analytics and operations improvement for Ontario SMEs
            </p>
            <h1 id="hero-title" className="text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              Find the profit hidden inside your business.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              TurboData helps established businesses uncover margin leaks, fix inefficient processes, and make better
              operating decisions using the data they already have.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.primaryCta.href}>{site.primaryCta.label}</ButtonLink>
              <ButtonLink href="/#services" variant="secondary">
                See How We Help
              </ButtonLink>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-ink-soft">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              {site.serviceArea}
            </p>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <OperatingViewVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}
