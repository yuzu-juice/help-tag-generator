import { useState, useCallback } from 'react'
import templates from '@/data/templates.json'
import type { Template } from '@/types'

export function useOfferTemplates() {
  const texts: Template[] = templates.offer.texts

  const [selectedTextId, setSelectedTextId] = useState(() => (texts.length > 0 ? texts[0].id : 0))
  const [text, setText] = useState(() => texts[0]?.text || '')

  const handleTextChange = useCallback(
    (id: number) => {
      setSelectedTextId(id)
      const selected = texts.find((t) => t.id === id)?.text || ''
      setText(selected)
    },
    [texts]
  )

  return {
    texts,
    selectedTextId,
    text,
    setText,
    handleTextChange,
  }
}
