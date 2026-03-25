import { useState, useCallback } from 'react'
import templates from '@/data/templates.json'
import type { Template } from '@/types'

export function useSeekTemplates() {
  const reasons: Template[] = templates.seek.reasons
  const requests: Template[] = templates.seek.requests

  const [selectedReasonId, setSelectedReasonId] = useState(() =>
    reasons.length > 0 ? reasons[0].id : 0
  )
  const [selectedRequestId, setSelectedRequestId] = useState(() =>
    requests.length > 0 ? requests[0].id : 0
  )
  const [text, setText] = useState(() => {
    const reason = reasons[0]?.text || ''
    const request = requests[0]?.text || ''
    return `${reason}\n${request}`
  })

  const updateText = useCallback(
    (reasonId: number, requestId: number) => {
      const reason = reasons.find((r) => r.id === reasonId)?.text || ''
      const request = requests.find((r) => r.id === requestId)?.text || ''
      setText(`${reason}\n${request}`)
    },
    [reasons, requests]
  )

  const handleReasonChange = useCallback(
    (id: number) => {
      setSelectedReasonId(id)
      updateText(id, selectedRequestId)
    },
    [selectedRequestId, updateText]
  )

  const handleRequestChange = useCallback(
    (id: number) => {
      setSelectedRequestId(id)
      updateText(selectedReasonId, id)
    },
    [selectedReasonId, updateText]
  )

  return {
    reasons,
    requests,
    selectedReasonId,
    selectedRequestId,
    text,
    setText,
    handleReasonChange,
    handleRequestChange,
  }
}
