/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

import { INITIAL_DESIGN_STATE } from "./constants"
import type { DesignState } from "./types"

type StatePatch = Partial<DesignState> | ((current: DesignState) => Partial<DesignState>)

interface DesignSystemContextValue {
  state: DesignState
  canUndo: boolean
  canRedo: boolean
  updateState: (patch: StatePatch, options?: { record?: boolean }) => void
  undo: () => void
  redo: () => void
  reset: () => void
}

interface HistoryState {
  past: DesignState[]
  present: DesignState
  future: DesignState[]
}

const MAX_HISTORY_LENGTH = 64

const DesignSystemContext = React.createContext<DesignSystemContextValue | undefined>(undefined)

function resolvePatch(current: DesignState, patch: StatePatch): Partial<DesignState> {
  if (typeof patch === "function") {
    return patch(current)
  }
  return patch
}

function createCommittedState(previous: HistoryState, next: DesignState, record: boolean): HistoryState {
  if (record) {
    const nextPast = [...previous.past, previous.present]
    const trimmedPast = nextPast.length > MAX_HISTORY_LENGTH ? nextPast.slice(-MAX_HISTORY_LENGTH) : nextPast
    return {
      past: trimmedPast,
      present: next,
      future: [],
    }
  }

  return {
    ...previous,
    present: next,
  }
}

function isEqualState(a: DesignState, b: DesignState) {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = React.useState<HistoryState>({
    past: [],
    present: INITIAL_DESIGN_STATE,
    future: [],
  })

  const updateState = React.useCallback(
    (patch: StatePatch, options?: { record?: boolean }) => {
      setHistory((previous) => {
        const patchValue = resolvePatch(previous.present, patch)
        const next = {
          ...previous.present,
          ...patchValue,
        }

        if (isEqualState(next, previous.present)) {
          return previous
        }

        return createCommittedState(previous, next, options?.record ?? true)
      })
    },
    []
  )

  const undo = React.useCallback(() => {
    setHistory((previous) => {
      if (previous.past.length === 0) {
        return previous
      }

      const restored = previous.past[previous.past.length - 1]
      return {
        past: previous.past.slice(0, -1),
        present: restored,
        future: [previous.present, ...previous.future],
      }
    })
  }, [])

  const redo = React.useCallback(() => {
    setHistory((previous) => {
      if (previous.future.length === 0) {
        return previous
      }

      const [restored, ...remainingFuture] = previous.future
      return {
        past: [...previous.past, previous.present],
        present: restored,
        future: remainingFuture,
      }
    })
  }, [])

  const reset = React.useCallback(() => {
    setHistory((previous) =>
      createCommittedState(previous, { ...INITIAL_DESIGN_STATE }, true)
    )
  }, [])

  const value = React.useMemo<DesignSystemContextValue>(
    () => ({
      state: history.present,
      canUndo: history.past.length > 0,
      canRedo: history.future.length > 0,
      updateState,
      undo,
      redo,
      reset,
    }),
    [history, updateState, undo, redo, reset]
  )

  return <DesignSystemContext.Provider value={value}>{children}</DesignSystemContext.Provider>
}

export function useDesignSystem() {
  const context = React.useContext(DesignSystemContext)
  if (!context) {
    throw new Error("useDesignSystem must be used within DesignSystemProvider")
  }
  return context
}
