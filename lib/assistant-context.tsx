"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { DEFAULT_SCENARIO } from "@/lib/assistant-scenarios"

interface AssistantContextType {
  /** 現在の接客モード（シナリオ id） */
  mode: string
  setMode: (id: string) => void
  /** チャットパネルの開閉 */
  isOpen: boolean
  open: () => void
  close: () => void
  /** モードを指定してパネルを開く（ハンバーガーから利用） */
  openWithMode: (id: string) => void
}

const AssistantContext = createContext<AssistantContextType>({
  mode: DEFAULT_SCENARIO,
  setMode: () => {},
  isOpen: false,
  open: () => {},
  close: () => {},
  openWithMode: () => {},
})

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<string>(DEFAULT_SCENARIO)
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const openWithMode = (id: string) => {
    setMode(id)
    setIsOpen(true)
  }

  return (
    <AssistantContext.Provider value={{ mode, setMode, isOpen, open, close, openWithMode }}>
      {children}
    </AssistantContext.Provider>
  )
}

export function useAssistant() {
  return useContext(AssistantContext)
}
