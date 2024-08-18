type DeckQuizProgressProps = {
  count: number
  totalCount: number
}

export const DeckQuizProgress = ({
  count,
  totalCount,
}: DeckQuizProgressProps) => {
  return (
    <div>
      <div className="text-center px-2">
        <span>{count}</span>
        <span className="text-xs">&nbsp;/&nbsp;{totalCount}</span>
      </div>
      <div className="relative h-3 w-full rounded-lg border border-muted-foreground/30 shadow-sm">
        <span
          className="absolute top-0 left-0 h-full rounded-lg bg-primary transition-all"
          style={{ width: `${Math.max(count / totalCount, 0) * 100}%` }}
        />
      </div>
    </div>
  )
}
