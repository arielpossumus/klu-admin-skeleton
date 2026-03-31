import * as React from "react"
import { format, isValid, parse } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const ISO_DATE = "yyyy-MM-dd"

export type DatePickerProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  "aria-invalid"?: boolean
}

const parseFormDate = (raw: string): Date | undefined => {
  const t = raw.trim()
  if (!t) return undefined
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
    const d = parse(t, ISO_DATE, new Date())
    return isValid(d) ? d : undefined
  }
  const d = parse(t, "dd/MM/yyyy", new Date())
  return isValid(d) ? d : undefined
}

export const DatePicker = ({
  id,
  value,
  onChange,
  disabled,
  placeholder = "Seleccioná una fecha",
  className,
  "aria-invalid": ariaInvalid,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)
  const selected = parseFormDate(value)

  const label = selected
    ? format(selected, "dd/MM/yyyy", { locale: es })
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          className={cn(
            "h-9 w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0" aria-hidden />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          defaultMonth={selected}
          selected={selected}
          onSelect={(d) => {
            onChange(d ? format(d, ISO_DATE) : "")
            setOpen(false)
          }}
          disabled={disabled}
          autoFocus
          startMonth={new Date(1920, 0)}
          endMonth={new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
