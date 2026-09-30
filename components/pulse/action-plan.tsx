"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Plus, X } from "lucide-react"
import { usePulse } from "@/components/pulse/store"
import { Badge } from "@/components/pulse/ui"
import { buttonStyles } from "@/components/site/primitives"
import { actionStatuses, formatDue, statusTone, type Action, type ActionStatus } from "@/lib/pulse"
import { cn } from "@/lib/utils"

type Filter = "All" | ActionStatus

const fieldClass =
  "block w-full rounded-lg border border-input bg-white px-3 py-2 text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"

export function ActionPlan() {
  const { actions, setActionStatus, addAction } = usePulse()
  const [filter, setFilter] = useState<Filter>("All")
  const [adding, setAdding] = useState(false)
  const [announcement, setAnnouncement] = useState("")

  const visible = filter === "All" ? actions : actions.filter((a) => a.status === filter)
  const count = (s: Filter) => (s === "All" ? actions.length : actions.filter((a) => a.status === s).length)

  function changeStatus(a: Action, status: ActionStatus) {
    setActionStatus(a.id, status)
    setAnnouncement(`${a.title} set to ${status}.`)
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Improvement action plan</h1>
          <p className="mt-2 text-ink-soft">Sample actions with owners, due dates, and expected measures.</p>
        </div>
        {!adding && (
          <button type="button" onClick={() => setAdding(true)} className={buttonStyles("primary")}>
            <Plus aria-hidden="true" className="h-4 w-4" />
            Add action
          </button>
        )}
      </div>

      {adding && (
        <AddActionForm
          onCancel={() => setAdding(false)}
          onSave={(a) => {
            addAction(a)
            setAdding(false)
            setFilter("All")
            setAnnouncement(`Action added: ${a.title}.`)
          }}
        />
      )}

      <div role="group" aria-label="Filter actions by status" className="mt-8 flex flex-wrap gap-2">
        {(["All", ...actionStatuses] as Filter[]).map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={filter === s}
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === s ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-ink/30",
            )}
          >
            {s} ({count(s)})
          </button>
        ))}
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-line bg-white p-8 text-center text-ink-soft">
          No actions with this status.
        </p>
      ) : (
        <>
          {/* Desktop and tablet: table */}
          <div className="mt-6 hidden overflow-x-auto rounded-xl border border-line bg-white shadow-[0_1px_3px_rgba(15,27,45,0.05)] lg:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Improvement actions</caption>
              <thead className="bg-paper text-ink">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Action</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Owner</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Due date</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Expected measure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {visible.map((a) => (
                  <tr key={a.id} className="align-top">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-ink">{a.title}</p>
                      {a.description && <p className="mt-1 text-ink-soft">{a.description}</p>}
                    </td>
                    <td className="px-4 py-4 text-ink">{a.owner}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-ink">{formatDue(a.due)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-start gap-2">
                        <StatusControl action={a} onChange={changeStatus} />
                        <CompleteButton action={a} onChange={changeStatus} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-ink-soft">{a.measure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards */}
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:hidden">
            {visible.map((a) => (
              <li key={a.id} className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_3px_rgba(15,27,45,0.05)]">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-semibold text-ink">{a.title}</h2>
                  <Badge tone={statusTone[a.status]}>{a.status}</Badge>
                </div>
                {a.description && <p className="mt-1 text-sm text-ink-soft">{a.description}</p>}
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-ink-soft">Owner</dt>
                    <dd className="font-medium text-ink">{a.owner}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-soft">Due date</dt>
                    <dd className="font-medium text-ink">{formatDue(a.due)}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-ink-soft">Expected measure</dt>
                    <dd className="font-medium text-ink">{a.measure}</dd>
                  </div>
                </dl>
                <div className="mt-4 flex flex-wrap items-end gap-3 border-t border-line pt-4">
                  <StatusControl action={a} onChange={changeStatus} idSuffix="m" />
                  <CompleteButton action={a} onChange={changeStatus} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="mt-6 text-sm text-ink-soft">
        Changes are kept only in this browser tab while you use the prototype. Nothing is saved to a server.
      </p>
    </>
  )
}

function StatusControl({
  action,
  onChange,
  idSuffix = "d",
}: {
  action: Action
  onChange: (a: Action, s: ActionStatus) => void
  idSuffix?: string
}) {
  const id = `status-${action.id}-${idSuffix}`
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Status for {action.title}
      </label>
      <select
        id={id}
        value={action.status}
        onChange={(e) => onChange(action, e.target.value as ActionStatus)}
        className={cn(
          "rounded-full border px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/40",
          {
            slate: "border-line bg-paper text-ink-soft",
            blue: "border-[#bcd3f5] bg-brand-soft text-[#0a3f94]",
            red: "border-[#f2c1bb] bg-[#fdecea] text-[#9b1c13]",
            teal: "border-[#b5ddd6] bg-teal-soft text-[#0b5a53]",
            amber: "border-[#f3d28a] bg-[#fdf3dc] text-[#7a4a00]",
          }[statusTone[action.status]],
        )}
      >
        {actionStatuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  )
}

function CompleteButton({ action, onChange }: { action: Action; onChange: (a: Action, s: ActionStatus) => void }) {
  if (action.status === "Complete") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0b5a53]">
        <Check aria-hidden="true" className="h-3.5 w-3.5" />
        Done
      </span>
    )
  }
  return (
    <button
      type="button"
      onClick={() => onChange(action, "Complete")}
      className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-ink hover:border-teal hover:text-teal"
    >
      <Check aria-hidden="true" className="h-3.5 w-3.5" />
      Mark complete<span className="sr-only">: {action.title}</span>
    </button>
  )
}

function AddActionForm({ onSave, onCancel }: { onSave: (a: Omit<Action, "id">) => void; onCancel: () => void }) {
  const [title, setTitle] = useState("")
  const [owner, setOwner] = useState("")
  const [due, setDue] = useState("2026-03-06")
  const [measure, setMeasure] = useState("")
  const [error, setError] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError(true)
      titleRef.current?.focus()
      return
    }
    onSave({
      title: title.trim().slice(0, 120),
      owner: owner.trim().slice(0, 40) || "Unassigned",
      due,
      status: "Backlog",
      measure: measure.trim().slice(0, 120) || "To be agreed",
    })
  }

  return (
    <form onSubmit={submit} noValidate className="mt-6 rounded-xl border border-line bg-white p-6 shadow-[0_1px_3px_rgba(15,27,45,0.06)]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">Add an action</h2>
        <button type="button" onClick={onCancel} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-paper">
          <X aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">Cancel adding an action</span>
        </button>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="new-title" className="block text-sm font-semibold text-ink">Action</label>
          <input
            ref={titleRef}
            id="new-title"
            value={title}
            maxLength={120}
            onChange={(e) => {
              setTitle(e.target.value)
              if (error) setError(false)
            }}
            aria-invalid={error || undefined}
            aria-describedby={error ? "new-title-error" : undefined}
            className={cn(fieldClass, "mt-1.5", error && "border-destructive")}
          />
          {error && (
            <p id="new-title-error" className="mt-1 text-sm text-destructive">
              Please describe the action.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="new-owner" className="block text-sm font-semibold text-ink">
            Owner <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input id="new-owner" value={owner} maxLength={40} onChange={(e) => setOwner(e.target.value)} className={cn(fieldClass, "mt-1.5")} />
        </div>
        <div>
          <label htmlFor="new-due" className="block text-sm font-semibold text-ink">Due date</label>
          <input id="new-due" type="date" value={due} required onChange={(e) => setDue(e.target.value || due)} className={cn(fieldClass, "mt-1.5")} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="new-measure" className="block text-sm font-semibold text-ink">
            Expected measure <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input id="new-measure" value={measure} maxLength={120} onChange={(e) => setMeasure(e.target.value)} className={cn(fieldClass, "mt-1.5")} />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className={buttonStyles("primary")}>Save action</button>
        <button type="button" onClick={onCancel} className={buttonStyles("secondary")}>Cancel</button>
      </div>
    </form>
  )
}
