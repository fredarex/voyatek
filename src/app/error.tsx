'use client' // Error components must be Client Components
 
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function ErrorB({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="textbase font-semibold text-b200">There was a problem</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
          {error.message || 'Somethng went wront'}
        </h1>

        <p className="mt-6 text-base leading-7 text-zinc-600">
          Please ty again later or contacts support if the problem persists.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={reset} className='bg-primary'>Try again</Button>
          <Link href="/dashboard"  className='border px-8 py-3 border-slate-200'>Go back to dashboard</Link>
        </div>
      </div>
    </div>
  )
}