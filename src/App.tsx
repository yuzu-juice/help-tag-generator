import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { HelpTagCard } from '@/components/HelpTagCard'
import { IconSelector } from '@/components/IconSelector'
import { TemplateSelector } from '@/components/TemplateSelector'
import { ConvenienceStoreDialog } from '@/components/ConvenienceStoreDialog'
import { useIcons } from '@/hooks/useIcons'
import { useTemplates } from '@/hooks/useTemplates'
import { exportToLSizeImage, downloadImage } from '@/utils/export'

const PRINT_PAGE_STYLE = `@page{size:auto;margin:10mm}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}`

function App() {
  const { icons, selectedIcon, selectIcon } = useIcons()
  const {
    reasons,
    requests,
    selectedReason,
    selectedRequest,
    text,
    setText,
    handleReasonChange,
    handleRequestChange,
  } = useTemplates()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const openConvenienceStoreDialog = async () => {
    if (!cardRef.current) return
    const url = await exportToLSizeImage(cardRef.current)
    setImageUrl(url)
    setDialogOpen(true)
  }

  const handleDownload = () => {
    if (!imageUrl) return
    downloadImage(imageUrl, 'help-tag.png')
  }

  const handlePrint = useReactToPrint({
    contentRef: cardRef,
    documentTitle: 'help-tag',
    pageStyle: PRINT_PAGE_STYLE,
  })

  if (!selectedIcon) {
    return <div className="min-h-screen bg-background p-8">アイコンがありません</div>
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-center text-2xl font-bold">Help Tag Generator</h1>

        <IconSelector
          icons={icons}
          selectedIcon={selectedIcon}
          onSelect={selectIcon}
        />

        <div className="space-y-4">
          <TemplateSelector
            label="理由"
            templates={reasons}
            value={selectedReason}
            onChange={handleReasonChange}
          />
          <TemplateSelector
            label="依頼"
            templates={requests}
            value={selectedRequest}
            onChange={handleRequestChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">テキスト（編集可）</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="テキストを入力"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">プレビュー</label>
          <div className="flex justify-center">
            <div ref={cardRef}>
              <HelpTagCard iconSrc={selectedIcon.src} text={text} />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button onClick={openConvenienceStoreDialog} size="lg">
            コンビニで印刷
          </Button>
          <Button onClick={handlePrint} variant="outline" size="lg">
            自宅で印刷
          </Button>
        </div>
      </div>

      <ConvenienceStoreDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onDownload={handleDownload}
      />
    </div>
  )
}

export default App
