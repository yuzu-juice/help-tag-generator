import type { Icon } from '@/types'

interface IconSelectorProps {
  icons: Icon[]
  selectedIcon: Icon | null
  onSelect: (icon: Icon) => void
}

export function IconSelector({
  icons,
  selectedIcon,
  onSelect,
}: IconSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">アイコンを選択</label>
      <div className="flex gap-3">
        {icons.map((icon) => (
          <button
            key={icon.id}
            onClick={() => onSelect(icon)}
            className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 transition-all ${
              selectedIcon?.id === icon.id
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <img src={icon.src} alt="" className="h-9 w-9 object-contain" />
          </button>
        ))}
      </div>
    </div>
  )
}
