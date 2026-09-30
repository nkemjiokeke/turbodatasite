// Pure calculation logic for the Pulse assessment. Kept separate from lib/pulse.ts
// so the question/content configuration stays easy to scan on its own.

import {
  assessmentSections,
  categories,
  categoryContent,
  scoreToTier,
  type Category,
  type Tier,
} from "@/lib/pulse"

const allQuestions = assessmentSections.flatMap((s) => s.questions)
export const scoredQuestionCount = allQuestions.filter((q) => q.category !== null).length
export const totalQuestionCount = allQuestions.length

export type CategoryScore = {
  category: Category
  score: number | null
  tier: Tier | null
  answered: number
  total: number
}

export function calculateCategoryScores(answers: Record<string, string>): CategoryScore[] {
  return categories.map((category) => {
    const questions = allQuestions.filter((q) => q.category === category)
    const answered = questions.filter((q) => answers[q.id])
    if (answered.length === 0) {
      return { category, score: null, tier: null, answered: 0, total: questions.length }
    }
    const sum = answered.reduce((total, q) => {
      const option = q.options.find((o) => o.label === answers[q.id])
      return total + (option?.score ?? 0)
    }, 0)
    const score = Math.round(sum / answered.length)
    return { category, score, tier: scoreToTier(score), answered: answered.length, total: questions.length }
  })
}

export function getTopAreas(categoryScores: CategoryScore[], count = 3): CategoryScore[] {
  return categoryScores
    .filter((c): c is CategoryScore & { score: number } => c.score !== null)
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
}

export function overallScore(categoryScores: CategoryScore[]): number | null {
  const scored = categoryScores.filter((c): c is CategoryScore & { score: number } => c.score !== null)
  if (scored.length === 0) return null
  return Math.round(scored.reduce((sum, c) => sum + c.score, 0) / scored.length)
}

function joinWithAnd(items: string[]): string {
  if (items.length === 0) return ""
  if (items.length === 1) return items[0]
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`
}

export function buildOverallInterpretation(topAreas: CategoryScore[]): string {
  if (topAreas.length === 0) {
    return "There was not enough information in the answers provided to identify priority areas."
  }
  const names = joinWithAnd(topAreas.map((a) => a.category))
  return `Based on the answers provided, ${names} may deserve attention first. This is a starting point for discussion, not a definitive diagnosis.`
}

export type RecommendedAction = { category: Category; title: string; why: string; firstStep: string }

export function buildRecommendedActions(topAreas: CategoryScore[]): RecommendedAction[] {
  return topAreas.map((area) => {
    const content = categoryContent[area.category]
    const tier = area.tier ?? "developing"
    return {
      category: area.category,
      title: `Improve ${area.category.toLowerCase()}`,
      why: content.whyItMatters,
      firstStep: content.tiers[tier].firstStep,
    }
  })
}

export type PlanItem = { timeframe: string; action: string; measure: string }

const planTimeframes = ["Week 1–2", "Week 2–3", "Week 3–4"]

export function build30DayPlan(actions: RecommendedAction[]): PlanItem[] {
  return actions.map((action, i) => ({
    timeframe: planTimeframes[i] ?? "Within 30 days",
    action: action.firstStep,
    measure: `Progress reviewed against: ${action.title}.`,
  }))
}

export type PulseReportData = {
  categoryScores: CategoryScore[]
  topAreas: CategoryScore[]
  overallInterpretation: string
  recommendedActions: RecommendedAction[]
  planItems: PlanItem[]
}

export function buildPulseReport(answers: Record<string, string>): PulseReportData {
  const categoryScores = calculateCategoryScores(answers)
  const topAreas = getTopAreas(categoryScores, 3)
  const recommendedActions = buildRecommendedActions(topAreas)
  return {
    categoryScores,
    topAreas,
    overallInterpretation: buildOverallInterpretation(topAreas),
    recommendedActions,
    planItems: build30DayPlan(recommendedActions),
  }
}
