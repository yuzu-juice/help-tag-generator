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

const iconModules = import.meta.glob('@/assets/icons/*.svg', { eager: true, import: 'default' }) as Record<string, string>

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
  const cardRef = useRef<HTMLDivElement>(null)

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

  const handleExport = async () => {
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
    })
    const link = document.createElement('a')
    link.download = 'help-tag.png'
    link.href = canvas.toDataURL('image/png')
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
                className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 transition-all ${
                  selectedIcon.id === icon.id
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
          <Button onClick={handleExport} variant="outline" size="lg">
            画像として保存
          </Button>
          <Button onClick={() => handlePrint()} size="lg">
            印刷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
