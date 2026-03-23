import type { Template } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TemplateSelectorProps {
  label: string
  templates: Template[]
  value: string
  onChange: (value: string) => void
}

export function TemplateSelector({
  label,
  templates,
  value,
  onChange,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
