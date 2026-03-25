import { IconSelector } from '@/components/IconSelector'
import { TemplateSelector } from '@/components/TemplateSelector'
import { TextareaField } from '@/components/TextareaField'
import type { Icon, Template } from '@/types'

interface SeekTabContentProps {
  icons: Icon[]
  selectedIcon: Icon | null
  onSelectIcon: (icon: Icon) => void
  reasons: Template[]
  requests: Template[]
  selectedReasonId: number
  selectedRequestId: number
  text: string
  onReasonChange: (id: number) => void
  onRequestChange: (id: number) => void
  onTextChange: (text: string) => void
}

export function SeekTabContent({
  icons,
  selectedIcon,
  onSelectIcon,
  reasons,
  requests,
  selectedReasonId,
  selectedRequestId,
  text,
  onReasonChange,
  onRequestChange,
  onTextChange,
}: SeekTabContentProps) {
  return (
    <div className="space-y-4">
      {selectedIcon && (
        <IconSelector icons={icons} selectedIcon={selectedIcon} onSelect={onSelectIcon} />
      )}

      <div className="space-y-4">
        <TemplateSelector
          label="理由"
          templates={reasons}
          value={selectedReasonId}
          onChange={onReasonChange}
        />
        <TemplateSelector
          label="依頼"
          templates={requests}
          value={selectedRequestId}
          onChange={onRequestChange}
        />
      </div>

      <TextareaField label="テキスト（編集可）" value={text} onChange={onTextChange} />
    </div>
  )
}
