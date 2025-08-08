"use client"

import React, { useState, useEffect } from "react"
import { StatItem } from "./StatItem"
import { TrendingUp, Users, Award, Activity, Globe, Leaf, Heart, Star, Zap, Target } from "lucide-react"

interface GlobalStatsBarProps {
  className?: string
}

export function GlobalStatsBar({ className }: GlobalStatsBarProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTrend, setActiveTrend] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const [showAchievement, setShowAchievement] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    // Rotate through trends
    const trendInterval = setInterval(() => {
      setActiveTrend((prev) => (prev + 1) % 4)
    }, 4000)
    
    // Show achievement notification
    const achievementInterval = setInterval(() => {
      setShowAchievement(true)
      setTimeout(() => setShowAchievement(false), 3000)
    }, 15000)
    
    return () => {
      clearInterval(timeInterval)
      clearInterval(trendInterval)
      clearInterval(achievementInterval)
    }
  }, [])

  const trends = [
    { value: "+12%", color: "text-emerald-300", icon: TrendingUp },
    { value: "+1", color: "text-blue-300", icon: Globe },
    { value: "+89", color: "text-green-300", icon: Leaf },
    { value: "+5", color: "text-yellow-300", icon: Star }
  ]

  const detailedStats = [
    {
      icon: "🐾",
      label: "Species",
      value: "150+",
      subtext: "discovered",
      color: "from-emerald-400 to-teal-500",
      trend: trends[0],
      isActive: activeTrend === 0,
      details: "New species discovered this month"
    },
    {
      icon: "🌍",
      label: "Regions",
      value: "3/5",
      subtext: "explored",
      color: "from-blue-400 to-cyan-500",
      progress: 60,
      trend: trends[1],
      isActive: activeTrend === 1,
      details: "2 regions remaining to unlock"
    },
    {
      icon: "🌱",
      label: "Impact",
      value: "1,247",
      subtext: "trees planted",
      color: "from-green-400 to-emerald-500",
      trend: trends[2],
      isActive: activeTrend === 2,
      details: "Carbon offset: 12.5 tons"
    },
    {
      icon: "⭐",
      label: "Achievements",
      value: "23",
      subtext: "unlocked",
      color: "from-yellow-400 to-orange-500",
      trend: trends[3],
      isActive: activeTrend === 3,
      details: "3 new achievements available"
    }
  ]

  const realTimeStats = [
    {
      icon: "👥",
      label: "Active Users",
      value: "2,341",
      change: "+23",
      color: "text-blue-300"
    },
    {
      icon: "🌿",
      label: "Protected Wildlife",
      value: "89",
      change: "+5",
      color: "text-emerald-300"
    },
    {
      icon: "📚",
      label: "Lessons Completed",
      value: "45",
      change: "+2",
      color: "text-yellow-300"
    },
    {
      icon: "🎯",
      label: "Daily Goal",
      value: "78%",
      change: "+12%",
      color: "text-purple-300"
    }
  ]

  return (
    <div className={`w-full h-56 md:h-52 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md border-b border-white/20 mt-16 relative overflow-hidden ${className}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-6 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-4 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Achievement Notification */}
      {showAchievement && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-md px-4 py-2 rounded-lg border border-yellow-400/50 animate-slide-in-right shadow-lg z-10">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-200 animate-pulse" />
            <span className="text-sm font-medium text-white">New Achievement Unlocked!</span>
          </div>
        </div>
      )}

      <div className="flex flex-col h-full px-4 md:px-8 relative z-10">
        {/* Enhanced Main Stats Row */}
        <div className="flex justify-between items-center h-28 md:h-26">
          <div className="flex space-x-2 md:space-x-4 lg:space-x-8 w-full justify-center md:justify-between">
            {detailedStats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex-1 max-w-32"
                onMouseEnter={() => setHoveredStat(stat.label)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <StatItem 
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  subtext={stat.subtext}
                  color={stat.color}
                  progress={stat.progress}
                  trend={stat.trend}
                  isActive={stat.isActive}
                  details={hoveredStat === stat.label ? stat.details : undefined}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Additional Details Row */}
        <div className="flex flex-col md:flex-row justify-between items-center h-28 md:h-26 text-xs md:text-sm">
          {/* Real-time Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-white/80 w-full md:w-auto">
            {realTimeStats.map((stat, index) => (
              <div 
                key={stat.label}
                className="flex items-center justify-center md:justify-start space-x-2 animate-fade-in group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <span className={`text-lg group-hover:animate-bounce`}>{stat.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs md:text-sm font-medium truncate">{stat.label}</div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold">{stat.value}</span>
                    <span className={`text-xs font-bold ${stat.color} animate-pulse`}>{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Quick Actions with Icons */}
          <div className="flex space-x-2 md:space-x-3 mt-3 md:mt-0">
            <button className="flex items-center space-x-1 px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 rounded-full text-emerald-200 text-xs font-medium transition-all duration-300 border border-emerald-400/30 hover:scale-105 animate-fade-in shadow-lg hover:shadow-emerald-500/25 group" style={{ animationDelay: '1.1s' }}>
              <Target className="h-3 w-3 group-hover:animate-pulse" />
              <span className="hidden sm:inline">View Progress</span>
              <span className="sm:hidden">Progress</span>
            </button>
            <button className="flex items-center space-x-1 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 rounded-full text-blue-200 text-xs font-medium transition-all duration-300 border border-blue-400/30 hover:scale-105 animate-fade-in shadow-lg hover:shadow-blue-500/25 group" style={{ animationDelay: '1.3s' }}>
              <Users className="h-3 w-3 group-hover:animate-pulse" />
              <span className="hidden sm:inline">Join Community</span>
              <span className="sm:hidden">Join</span>
            </button>
            <button className="flex items-center space-x-1 px-3 md:px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-full text-purple-200 text-xs font-medium transition-all duration-300 border border-purple-400/30 hover:scale-105 animate-fade-in shadow-lg hover:shadow-purple-500/25 group" style={{ animationDelay: '1.5s' }}>
              <Award className="h-3 w-3 group-hover:animate-pulse" />
              <span className="hidden sm:inline">Achievements</span>
              <span className="sm:hidden">Awards</span>
            </button>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="flex items-center justify-center space-x-4 text-xs text-white/60 mt-2 animate-fade-in" style={{ animationDelay: '1.7s' }}>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live Activity</span>
          </div>
          <span>•</span>
          <span>{currentTime.toLocaleTimeString()}</span>
          <span>•</span>
          <span>Last updated: 2 min ago</span>
        </div>
      </div>
    </div>
  )
} 