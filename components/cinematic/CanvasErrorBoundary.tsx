"use client"

import { Component, ReactNode, ErrorInfo } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("WebGL Canvas Error caught by boundary:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-0 bg-[#010102] pointer-events-none overflow-hidden">
          {/* Atmospheric CSS Radial Fallback */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-intel-blue/20 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-power-red/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-intel-blue/10 rounded-full blur-[150px]"></div>
        </div>
      )
    }

    return this.props.children
  }
}
