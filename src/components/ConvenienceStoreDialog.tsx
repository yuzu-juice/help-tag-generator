import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ConvenienceStoreDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDownload: () => void
}

export function ConvenienceStoreDialog({
  open,
  onOpenChange,
  onDownload,
}: ConvenienceStoreDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>コンビニで印刷する</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4 pt-4">
              <ol className="list-decimal list-inside space-y-3 text-sm">
                <li>
                  <button
                    onClick={onDownload}
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
  )
}
