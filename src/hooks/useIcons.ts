import { useState } from 'react'
import type { Icon } from '@/types'

export function useIcons() {
  const iconModules = import.meta.glob('@/assets/icons/*.png', {
    eager: true,
    import: 'default',
  }) as Record<string, string>

  const icons: Icon[] = Object.entries(iconModules).map(([path, src]) => ({
    id: path.replace(/.*\/(\d+)\.png$/, '$1'),
    src,
  }))

  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(icons.length > 0 ? icons[0] : null)

  const handleSelectIcon = (icon: Icon) => {
    setSelectedIcon(icon)
  }

  return {
    icons,
    selectedIcon,
    selectIcon: handleSelectIcon,
  }
}
