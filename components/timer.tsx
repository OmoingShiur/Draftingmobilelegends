"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface TimerProps {
  initialTime: number
}

export function Timer({ initialTime }: TimerProps) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRunning, time])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTime(initialTime)
    setIsRunning(false)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="ghost" size="sm" onClick={toggleTimer}>
        {isRunning ? "||" : <Play className="h-4 w-4" />}
      </Button>
      <div className="text-2xl font-bold">{formatTime(time)}</div>
      <Button variant="ghost" size="sm" onClick={resetTimer}>
        Reset
      </Button>
    </div>
  )
}

