import { CARD_WIDTH_MM, CARD_HEIGHT_MM } from '@/constants'

interface HelpTagCardProps {
  iconSrc: string
  text: string
}

export function HelpTagCard({ iconSrc, text }: HelpTagCardProps) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[2mm] border border-black bg-white"
      style={{ width: `${CARD_WIDTH_MM}mm`, height: `${CARD_HEIGHT_MM}mm` }}
    >
      <div className="flex flex-1 items-center justify-center bg-white px-[3mm] pb-[3mm] pt-[5mm]">
        <img src={iconSrc} alt="" className="h-[30mm] w-[30mm] object-contain" />
      </div>
      <div className="flex flex-1 items-center justify-center bg-white p-[2mm]">
        <p
          className="whitespace-pre-line text-center font-bold text-black"
          style={{ fontSize: '4.5mm', lineHeight: 1.625 }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
