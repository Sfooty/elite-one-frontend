import { cn } from '@/utilities/cn'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useTranslations } from 'use-intl'

type DatePickerProps = {
  value?: Date | null
  onChange?: (date: Date | undefined) => void
  id?: string
}

export function DatePicker({ value, onChange, id }: DatePickerProps) {

  const t = useTranslations()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
          id={id}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP') : <span>{t("pick-a-date")}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value? value : undefined} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
