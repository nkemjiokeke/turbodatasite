// Simple, static chart building blocks for insight articles.
// One hue (brand blue, solid for emphasis / light tint for comparison) so
// charts read as part of the site rather than introducing a separate palette.

export const CHART_BRAND = "#0056d2"
export const CHART_BRAND_LIGHT = "#5991e2"
export const CHART_GRID = "#e2dfd6"
export const CHART_GUIDE = "#3d4a5c"

type Segment = { value: number; color: string; label: string }
type Bar = { label: string; segments: Segment[]; valueLabel?: string }

export function BarChart({
  title,
  bars,
  referenceLine,
  caption,
}: {
  title: string
  bars: Bar[]
  referenceLine?: { value: number; label: string }
  caption?: string
}) {
  const totals = bars.map((b) => b.segments.reduce((sum, seg) => sum + seg.value, 0))
  const maxValue = Math.max(...totals, referenceLine?.value ?? 0) * 1.08

  const legendMap = new Map<string, string>()
  bars.forEach((b) => b.segments.forEach((s) => legendMap.set(s.label, s.color)))
  const legend = Array.from(legendMap, ([label, color]) => ({ label, color }))
  const refPercent = referenceLine ? (referenceLine.value / maxValue) * 100 : null

  return (
    <figure className="rounded-xl border border-line bg-white p-5 sm:p-6">
      <figcaption className="text-sm font-bold text-ink">{title}</figcaption>
      <div className="relative mt-5 space-y-4">
        {refPercent !== null && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 top-0 border-l-2 border-dashed"
            style={{ left: `${refPercent}%`, borderColor: CHART_GUIDE }}
          />
        )}
        {bars.map((bar) => {
          const total = bar.segments.reduce((sum, seg) => sum + seg.value, 0)
          return (
            <div key={bar.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-ink">{bar.label}</span>
                <span className="shrink-0 font-semibold text-ink">{bar.valueLabel ?? total}</span>
              </div>
              <div className="mt-1.5 flex h-6 overflow-hidden rounded-md bg-paper-2">
                {bar.segments.map((seg, i) => (
                  <div
                    key={i}
                    style={{ width: `${(seg.value / maxValue) * 100}%`, backgroundColor: seg.color }}
                    className="h-full first:rounded-l-md last:rounded-r-md"
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {(legend.length > 1 || referenceLine) && (
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
          {legend.length > 1 &&
            legend.map((l) => (
              <li key={l.label} className="flex items-center gap-2 text-sm text-ink-soft">
                <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: l.color }} />
                {l.label}
              </li>
            ))}
          {referenceLine && (
            <li className="flex items-center gap-2 text-sm text-ink-soft">
              <span aria-hidden="true" className="h-0 w-3.5 shrink-0 border-t-2 border-dashed" style={{ borderColor: CHART_GUIDE }} />
              {referenceLine.label}
            </li>
          )}
        </ul>
      )}
      {caption && <p className="mt-3 text-sm text-ink-soft">{caption}</p>}
    </figure>
  )
}

type Series = { label: string; color: string; values: number[]; dashed?: boolean }

export function LineChart({
  title,
  xLabels,
  series,
  valueFormat = (v: number) => String(v),
  annotation,
  caption,
}: {
  title: string
  xLabels: string[]
  series: Series[]
  valueFormat?: (v: number) => string
  annotation?: { index: number; label: string }
  caption?: string
}) {
  const width = 640
  const height = 260
  const padding = { top: 20, right: 12, bottom: 30, left: 12 }
  const plotW = width - padding.left - padding.right
  const plotH = height - padding.top - padding.bottom

  const allValues = series.flatMap((s) => s.values)
  const minV = Math.min(0, ...allValues)
  const maxV = Math.max(...allValues) * 1.12

  const n = xLabels.length
  const xStep = n > 1 ? plotW / (n - 1) : 0
  const xAt = (i: number) => padding.left + i * xStep
  const yAt = (v: number) => padding.top + plotH - ((v - minV) / (maxV - minV || 1)) * plotH

  const gridCount = 4
  const midIndex = Math.floor((n - 1) / 2)

  return (
    <figure className="rounded-xl border border-line bg-white p-5 sm:p-6">
      <figcaption className="text-sm font-bold text-ink">{title}</figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title} className="mt-4 h-auto w-full">
        {Array.from({ length: gridCount + 1 }, (_, i) => {
          const gy = padding.top + (plotH / gridCount) * i
          return <line key={i} x1={padding.left} y1={gy} x2={width - padding.right} y2={gy} stroke={CHART_GRID} strokeWidth={1} />
        })}

        {annotation && (
          <g>
            <line
              x1={xAt(annotation.index)}
              y1={padding.top}
              x2={xAt(annotation.index)}
              y2={height - padding.bottom}
              stroke={CHART_GUIDE}
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
            <text x={xAt(annotation.index)} y={padding.top - 6} fontSize="11" fontWeight={600} fill={CHART_GUIDE} textAnchor="middle">
              {annotation.label}
            </text>
          </g>
        )}

        {xLabels.map((lbl, i) =>
          i === 0 || i === n - 1 || i === midIndex ? (
            <text
              key={i}
              x={xAt(i)}
              y={height - 8}
              fontSize="11"
              fill="#3d4a5c"
              textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
            >
              {lbl}
            </text>
          ) : null,
        )}

        {series.map((s) => {
          const last = s.values.length - 1
          return (
            <g key={s.label}>
              <polyline
                points={s.values.map((v, i) => `${xAt(i)},${yAt(v)}`).join(" ")}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={s.dashed ? "5 4" : undefined}
              />
              <circle cx={xAt(last)} cy={yAt(s.values[last])} r={4} fill={s.color} />
              <text x={xAt(last) - 6} y={yAt(s.values[last]) - 10} fontSize="11" fontWeight={700} fill={s.color} textAnchor="end">
                {valueFormat(s.values[last])}
              </text>
            </g>
          )
        })}
      </svg>
      {series.length > 1 && (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
          {series.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-sm text-ink-soft">
              <span aria-hidden="true" className="h-0 w-3.5 shrink-0 border-t-2" style={{ borderColor: s.color, borderStyle: s.dashed ? "dashed" : "solid" }} />
              {s.label}
            </li>
          ))}
        </ul>
      )}
      {caption && <p className="mt-3 text-sm text-ink-soft">{caption}</p>}
    </figure>
  )
}
