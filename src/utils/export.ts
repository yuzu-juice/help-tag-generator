import html2canvas from 'html2canvas'
import { L_SIZE_WIDTH_MM, L_SIZE_HEIGHT_MM, PX_PER_MM } from '@/constants'

export async function exportToLSizeImage(cardElement: HTMLDivElement): Promise<string> {
  const cardCanvas = await html2canvas(cardElement, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
  })

  const scale = 2
  const lSizeCanvas = document.createElement('canvas')
  lSizeCanvas.width = L_SIZE_WIDTH_MM * scale * PX_PER_MM
  lSizeCanvas.height = L_SIZE_HEIGHT_MM * scale * PX_PER_MM

  const ctx = lSizeCanvas.getContext('2d')
  if (!ctx) throw new Error('Failed to get canvas context')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, lSizeCanvas.width, lSizeCanvas.height)

  const x = (lSizeCanvas.width - cardCanvas.width) / 2
  const y = (lSizeCanvas.height - cardCanvas.height) / 2
  ctx.drawImage(cardCanvas, x, y)

  return lSizeCanvas.toDataURL('image/png')
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
