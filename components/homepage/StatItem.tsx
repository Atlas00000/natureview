"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface StatItemProps {
  icon: string
  label: string
  value: string
  subtext: string
  color?: string
  progress?: number
  className?: string
  trend?: { value: string; color: string }
  isActive?: boolean
  details?: string
}

export function StatItem({ 
  icon, 
  label, 
  value, 
  subtext, 
  color = "from-emerald-400 to-teal-500",
  progress,
  className,
  trend,
  isActive = false,
  details
}: StatItemProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-105 relative group",
      isActive && "scale-110 ring-2 ring-emerald-400/50 shadow-lg",
      className
    )}>
      {/* Hover Tooltip */}
      {details && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 backdrop-blur-md text-white text-xs rounded-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-lg">
          {details}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
        </div>
      )}
      
      {/* Icon */}
      <div className={cn(
        "text-xl md:text-2xl lg:text-3xl mb-1 animate-bounce-gentle",
        isActive && "animate-pulse"
      )}>
        {icon}
      </div>
      
      {/* Main Value */}
      <div className="text-sm md:text-lg lg:text-xl font-bold text-white mb-1">
        <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
          {value}
        </span>
      </div>
      
      {/* Label */}
      <div className="text-xs md:text-sm font-medium text-emerald-200 mb-1">
        {label}
      </div>
      
      {/* Subtext */}
      <div className="text-xs text-white/70 mb-1">
        {subtext}
      </div>
      
      {/* Trend Indicator */}
      {trend && (
        <div className={cn(
          "text-xs font-bold animate-fade-in flex items-center space-x-1",
          trend.color
        )}>
          <span>{trend.value}</span>
          {isActive && (
            <div className="w-1 h-1 bg-current rounded-full animate-ping"></div>
          )}
        </div>
      )}
      
      {/* Progress Bar (if provided) */}
      {progress && (
        <div className="w-full mt-1 md:mt-2">
          <div className="w-full bg-white/20 rounded-full h-1">
            <div 
              className={cn(
                "h-1 rounded-full transition-all duration-1000 ease-out",
                color
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-white/60 mt-1">
            {progress}% complete
          </div>
        </div>
      )}
    </div>
  )
} 