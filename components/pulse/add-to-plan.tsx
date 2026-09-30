"use client"

import Link from "next/link"
import { Check, Plus } from "lucide-react"
import { usePulse } from "@/components/pulse/store"
import { buttonStyles } from "@/components/site/primitives"
import type { Action } from "@/lib/pulse"

export function AddFindingToPlan({ action, className }: { action: Omit<Action, "id">; className?: string }) {
  const { addAction, hasAction } = usePulse()
  const added = hasAction(action.title)

  return (
    <span className="inline-flex flex-col gap-2">
      <button
        type="button"
        disabled={added}
        onClick={() => addAction(action)}
        className={buttonStyles("primary", `disabled:cursor-default disabled:bg-teal ${className ?? ""}`)}
      >
        {added ? <Check aria-hidden="true" className="h-4 w-4" /> : <Plus aria-hidden="true" className="h-4 w-4" />}
        {added ? "Added to action plan" : "Add to action plan"}
      </button>
      <span role="status" className="text-sm text-ink-soft">
        {added && (
          <>
            Added.{" "}
            <Link href="/pulse/app/action-plan" className="font-semibold text-brand hover:underline">
              Open the action plan
            </Link>
          </>
        )}
      </span>
    </span>
  )
}
