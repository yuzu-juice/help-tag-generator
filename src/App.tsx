import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const iconModules = import.meta.glob('@/assets/icons/*.png', { eager: true, import: 'default' }) as Record<string, string>

const icons = Object.entries(iconModules).map(([path, src]) => ({
  id: path.replace(/.*\/(\d+)\.svg$/, '$1'),
  src,
}))

const reasons = [
  { id: 'byouki', text: '持病があるため' },
  { id: 'taityou', text: '体調が悪く' },
  { id: 'naibu', text: '内部疾患があるため' },
  { id: 'seishin', text: '精神的にしんどく' },
  { id: 'choukaku', text: '聴覚障害があるため' },
  { id: 'kega', text: '怪我をしているため' },
]

const requests = [
  { id: 'seki', text: 'お席をお譲り頂けないでしょうか' },
  { id: 'hitsudan', text: '筆談でご対応頂けないでしょうか' },
]

function App() {
  const [selectedIcon, setSelectedIcon] = useState(icons[0])
  const [selectedReason, setSelectedReason] = useState(reasons[0].id)
  const [selectedRequest, setSelectedRequest] = useState(requests[0].id)
  const [text, setText] = useState(`${reasons[0].text}\n${requests[0].text}`)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  const updateText = (reasonId: string, requestId: string) => {
    const reason = reasons.find((r) => r.id === reasonId)?.text || ''
    const request = requests.find((r) => r.id === requestId)?.text || ''
    setText(`${reason}\n${request}`)
  }

  const handleReasonChange = (value: string) => {
    setSelectedReason(value)
    updateText(value, selectedRequest)
  }

  const handleRequestChange = (value: string) => {
    setSelectedRequest(value)
    updateText(selectedReason, value)
  }

  const openConvenienceStoreDialog = async () => {
    if (!exportRef.current) return
    const canvas = await html2canvas(exportRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
    })
    setImageUrl(canvas.toDataURL('image/png'))
    setDialogOpen(true)
  }

  const downloadImage = () => {
    if (!imageUrl) return
    const link = document.createElement('a')
    link.download = 'help-tag.png'
    link.href = imageUrl
    link.click()
  }

  const handlePrint = useReactToPrint({
    contentRef: cardRef,
    documentTitle: 'help-tag',
    pageStyle: `
      @page {
        size: auto;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .print-card {
          width: 57mm !important;
          height: 85mm !important;
        }
      }
    `,
  })

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-center text-2xl font-bold">Help Tag Generator</h1>

        <div className="space-y-2">
          <label className="text-sm font-medium">アイコンを選択</label>
          <div className="flex gap-3">
            {icons.map((icon) => (
              <button
                key={icon.id}
                onClick={() => setSelectedIcon(icon)}
                className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 transition-all ${selectedIcon.id === icon.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
                  }`}
              >
                <img src={icon.src} alt="" className="h-9 w-9 object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">理由</label>
            <Select value={selectedReason} onValueChange={handleReasonChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((reason) => (
                  <SelectItem key={reason.id} value={reason.id}>
                    {reason.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">依頼</label>
            <Select value={selectedRequest} onValueChange={handleRequestChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {requests.map((request) => (
                  <SelectItem key={request.id} value={request.id}>
                    {request.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">テキスト（編集可）</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={3}
            placeholder="テキストを入力"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">プレビュー</label>
          <div className="flex justify-center">
            <div
              ref={cardRef}
              className="print-card flex flex-col overflow-hidden rounded-2xl border-2 border-black bg-white"
              style={{ width: '228px', height: '340px' }}
            >
              <div className="flex flex-1 items-center justify-center bg-white p-6">
                <img src={selectedIcon.src} alt="" className="h-24 w-24 object-contain" />
              </div>
              <div className="flex flex-1 items-center justify-center bg-white p-4">
                <p className="whitespace-pre-line text-center text-lg font-bold text-black leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button onClick={openConvenienceStoreDialog} size="lg">
            コンビニで印刷
          </Button>
          <Button onClick={() => handlePrint()} variant="outline" size="lg">
            自宅で印刷
          </Button>
        </div>
      </div>

      <div
        ref={exportRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '-9999px',
          width: '1050px',
          height: '1500px',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '673px',
            height: '1004px',
            border: '4px solid black',
            borderRadius: '24px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
            <img src={selectedIcon.src} alt="" style={{ width: '288px', height: '288px', objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
            <p style={{ whiteSpace: 'pre-line', textAlign: 'center', fontSize: '48px', fontWeight: 'bold', color: 'black', lineHeight: 1.6 }}>
              {text}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>コンビニで印刷する</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 pt-4">
                <ol className="list-decimal list-inside space-y-3 text-sm">
                  <li>
                    <button
                      onClick={downloadImage}
                      className="text-primary underline font-medium"
                    >
                      画像を保存
                    </button>
                  </li>
                  <li>
                    <a
                      href="https://networkprint.ne.jp/Lite/start"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline font-medium"
                    >
                      ネットワークプリントを開く →
                    </a>
                  </li>
                  <li>ファイルを選択 → そのまま登録</li>
                  <li>発行されたユーザー番号、QRコードで印刷</li>
                </ol>
                <p className="text-xs text-muted-foreground">
                  ※ L判（89mm×127mm）で印刷してください
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
