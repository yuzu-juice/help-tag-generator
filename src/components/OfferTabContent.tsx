import { TemplateSelector } from '@/components/TemplateSelector'
import { TextareaField } from '@/components/TextareaField'
import type { Template } from '@/types'

interface OfferTabContentProps {
  texts: Template[]
  selectedTextId: number
  text: string
  onTextChange: (id: number) => void
  onCustomTextChange: (text: string) => void
}

export function OfferTabContent({
  texts,
  selectedTextId,
  text,
  onTextChange,
  onCustomTextChange,
}: OfferTabContentProps) {
  return (
    <div className="space-y-4">
      <TemplateSelector
        label="テキスト"
        templates={texts}
        value={selectedTextId}
        onChange={onTextChange}
      />

      <TextareaField label="テキスト（編集可）" value={text} onChange={onCustomTextChange} />
    </div>
  )
}
