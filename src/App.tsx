import { useRef, useState, useCallback } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { HelpTagCard } from '@/components/HelpTagCard'
import { SeekTabContent } from '@/components/SeekTabContent'
import { OfferTabContent } from '@/components/OfferTabContent'
import { ConvenienceStoreDialog } from '@/components/ConvenienceStoreDialog'
import { useIcons } from '@/hooks/useIcons'
import { useSeekTemplates } from '@/hooks/useSeekTemplates'
import { useOfferTemplates } from '@/hooks/useOfferTemplates'
import { exportToLSizeImage, downloadImage } from '@/utils/export'
import type { HelpType } from '@/types'

const PRINT_PAGE_STYLE = `@page{size:auto;margin:10mm}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}`

function App() {
  const [helpType, setHelpType] = useState<HelpType>('seek')
  const { icons, selectedIcon, selectIcon } = useIcons()
  const seek = useSeekTemplates()
  const offer = useOfferTemplates()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentText = helpType === 'seek' ? seek.text : offer.text
  const currentIconSrc = helpType === 'seek' ? selectedIcon?.src : undefined

  const openConvenienceStoreDialog = useCallback(async () => {
    if (!cardRef.current) return
    const url = await exportToLSizeImage(cardRef.current)
    setImageUrl(url)
    setDialogOpen(true)
  }, [])

  const handleDownload = useCallback(() => {
    if (!imageUrl) return
    downloadImage(imageUrl, 'help-tag.png')
  }, [imageUrl])

  const handlePrint = useReactToPrint({
    contentRef: cardRef,
    documentTitle: 'help-tag',
    pageStyle: PRINT_PAGE_STYLE,
  })

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-center text-2xl font-bold">Help Tag Generator</h1>

        <Tabs value={helpType} onValueChange={(v) => setHelpType(v as HelpType)}>
          <TabsList className="w-full">
            <TabsTrigger value="seek" className="flex-1">
              助けを求める
            </TabsTrigger>
            <TabsTrigger value="offer" className="flex-1">
              助けを提供する
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seek">
            <SeekTabContent
              icons={icons}
              selectedIcon={selectedIcon}
              onSelectIcon={selectIcon}
              reasons={seek.reasons}
              requests={seek.requests}
              selectedReasonId={seek.selectedReasonId}
              selectedRequestId={seek.selectedRequestId}
              text={seek.text}
              onReasonChange={seek.handleReasonChange}
              onRequestChange={seek.handleRequestChange}
              onTextChange={seek.setText}
            />
          </TabsContent>

          <TabsContent value="offer">
            <OfferTabContent
              texts={offer.texts}
              selectedTextId={offer.selectedTextId}
              text={offer.text}
              onTextChange={offer.handleTextChange}
              onCustomTextChange={offer.setText}
            />
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <label className="text-sm font-medium">プレビュー</label>
          <div className="flex justify-center">
            <div ref={cardRef}>
              <HelpTagCard iconSrc={currentIconSrc} text={currentText} />
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
