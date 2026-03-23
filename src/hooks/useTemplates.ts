import { useState, useCallback } from 'react'
import templates from '@/data/templates.json'
import type { Template } from '@/types'

export function useTemplates() {
  const reasons: Template[] = templates.reasons
  const requests: Template[] = templates.requests

  const [selectedReason, setSelectedReason] = useState(
    reasons.length > 0 ? reasons[0].id : ''
  )
  const [selectedRequest, setSelectedRequest] = useState(
    requests.length > 0 ? requests[0].id : ''
  )
  const [text, setText] = useState(
    reasons.length > 0 && requests.length > 0
      ? `${reasons[0].text}\n${requests[0].text}`
      : ''
  )

  const updateText = useCallback(
    (reasonId: string, requestId: string) => {
      const reason = reasons.find((r) => r.id === reasonId)?.text || ''
      const request = requests.find((r) => r.id === requestId)?.text || ''
      setText(`${reason}\n${request}`)
    },
    [reasons, requests]
  )

  const handleReasonChange = useCallback(
    (value: string) => {
      setSelectedReason(value)
      updateText(value, selectedRequest)
    },
    [selectedRequest, updateText]
  )

  const handleRequestChange = useCallback(
    (value: string) => {
      setSelectedRequest(value)
      updateText(selectedReason, value)
    },
    [selectedReason, updateText]
  )

  return {
    reasons,
    requests,
    selectedReason,
    selectedRequest,
    text,
    setText,
    handleReasonChange,
    handleRequestChange,
  }
}
