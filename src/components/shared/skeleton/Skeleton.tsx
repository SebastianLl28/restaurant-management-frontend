import { cn } from '@/lib/utils'
// import { Skeleton as SkeletonCn } from '../../ui/skeleton'

interface SkeletonProps {
  isLoading?: boolean
  value?: string | number | null
  className?: string
  children?: React.ReactNode
}

const Skeleton = ({ isLoading, className, children }: SkeletonProps) => {
  const shouldRenderSkeleton = isLoading

  if (shouldRenderSkeleton) {
    return (
      <div className={cn('animate-pulse rounded-md bg-muted', className)} />
    )
  }

  return <>{children}</>
}

export default Skeleton
