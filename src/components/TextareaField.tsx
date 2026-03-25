import { Textarea } from '@/components/ui/textarea'

interface TextareaFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function TextareaField({
  label,
  value,
  onChange,
  placeholder = 'テキストを入力',
  rows = 3,
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  )
}
