import * as React from "react"

// ** Utils
import { cn } from "@/lib/utils"

// ** Icons
import { Search } from 'lucide-react';

// ** Components
import { Button } from "./button"

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex items-center border rounded-lg file:bg-transparent file:text-sm file:font-medium w-[400px] border-[#213e7d0f]  ring-offset-white file:border-0  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-l-md bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-500 ",
            className
          )}
          ref={ref}
          {...props}
        />
        <Button className="h-10 rounded-l-none bg-primary"><Search /></Button>
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
