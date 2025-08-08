"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Snowflake, Mountain, TreePine, Waves, Globe,
  MapPin, ChevronRight, Sparkles, Lock, Play
} from "lucide-react"

interface Region {
  id: string
  name: string
  displayName: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  isUnlocked: boolean
  previewImage: string
  wildlife: string[]
  status?: 'available' | 'coming-soon' | 'locked'
  difficulty?: 'easy' | 'medium' | 'hard'
}

const regions: Region[] = [
  {
    id: "arctic",
    name: "Arctic Life",
    displayName: "Arctic Life",
    description: "Polar bears, arctic foxes, snowy owls",
    icon: Snowflake,
    isUnlocked: true,
    previewImage: "/assets/arctic-preview.jpg",
    wildlife: ["Polar Bear", "Arctic Fox", "Snowy Owl", "Seal"],
    status: 'available',
    difficulty: 'easy'
  },
  {
    id: "alpine",
    name: "Alpine Heights",
    displayName: "Alpine Heights",
    description: "Mountain goats, eagles, marmots",
    icon: Mountain,
    isUnlocked: true,
    previewImage: "/assets/alpine-preview.jpg",
    wildlife: ["Mountain Goat", "Golden Eagle", "Marmot", "Alpine Ibex"],
    status: 'available',
    difficulty: 'medium'
  },
  {
    id: "forest",
    name: "Forest Realm",
    displayName: "Forest Realm",
    description: "Wolves, deer, owls, foxes",
    icon: TreePine,
    isUnlocked: true,
    previewImage: "/assets/forest-preview.jpg",
    wildlife: ["Gray Wolf", "Red Deer", "Great Horned Owl", "Red Fox"],
    status: 'available',
    difficulty: 'easy'
  },
  {
    id: "coastal",
    name: "Coastal Waters",
    displayName: "Coastal Waters",
    description: "Seals, whales, seabirds, fish",
    icon: Waves,
    isUnlocked: true,
    previewImage: "/assets/coastal-preview.jpg",
    wildlife: ["Harbor Seal", "Humpback Whale", "Seagull", "Atlantic Cod"],
    status: 'coming-soon',
    difficulty: 'medium'
  },
  {
    id: "global",
    name: "Global Safari",
    displayName: "Global Safari",
    description: "Worldwide wildlife showcase",
    icon: Globe,
    isUnlocked: true,
    previewImage: "/assets/global-preview.jpg",
    wildlife: ["Lion", "Elephant", "Giraffe", "Zebra"],
    status: 'available',
    difficulty: 'hard'
  }
]

interface RegionSelectorProps {
  onRegionSelect?: (region: string) => void
  currentRegion?: string
}

export function RegionSelector({ onRegionSelect, currentRegion }: RegionSelectorProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const handleRegionClick = (regionId: string) => {
    const region = regions.find(r => r.id === regionId)
    if (region?.status === 'available') {
      onRegionSelect?.(regionId)
      // Navigate to the region page
      window.location.href = `/regions/${regionId}`
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'hard': return 'text-red-400'
      default: return 'text-emerald-300'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Beginner'
      case 'medium': return 'Intermediate'
      case 'hard': return 'Advanced'
      default: return 'All Levels'
    }
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-emerald-900/20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-emerald-400 mr-3 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Choose Your Adventure
            </h2>
            <Sparkles className="h-8 w-8 text-emerald-400 ml-3 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto leading-relaxed">
            Each region unlocks different wildlife and learning experiences
          </p>
        </div>

        {/* Region Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, index) => {
            const IconComponent = region.icon
            const isCurrent = currentRegion === region.id
            const isHovered = hoveredRegion === region.id
            const isAvailable = region.status === 'available'

            return (
              <div
                key={region.id}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  isCurrent ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => handleRegionClick(region.id)}
              >
                {/* Region Card */}
                <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 transition-all duration-500 ${
                  isCurrent 
                    ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/25' 
                    : isAvailable
                    ? 'border-white/20 hover:border-emerald-300 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20'
                    : 'border-gray-500/30 bg-gray-500/10 opacity-60'
                }`}>
                  {/* Status Badge */}
                  <div className="absolute -top-2 -left-2">
                    {region.status === 'coming-soon' && (
                      <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-white animate-pulse">
                        Coming Soon
                      </div>
                    )}
                    {region.status === 'locked' && (
                      <div className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white">
                        <Lock className="h-3 w-3 inline mr-1" />
                        Locked
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full transition-all duration-500 ${
                      isCurrent 
                        ? 'bg-emerald-500/30 text-emerald-300 shadow-lg shadow-emerald-500/25' 
                        : isAvailable
                        ? 'bg-white/20 text-white group-hover:bg-emerald-500/30 group-hover:text-emerald-300 group-hover:shadow-lg group-hover:shadow-emerald-500/25'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    {isCurrent && (
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {region.displayName}
                      </h3>
                      <p className="text-emerald-200 text-sm leading-relaxed">
                        {region.description}
                      </p>
                    </div>
                    
                    {/* Difficulty Indicator */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${getDifficultyColor(region.difficulty || 'easy')}`}>
                        {getDifficultyText(region.difficulty || 'easy')}
                      </span>
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              level <= (region.difficulty === 'easy' ? 1 : region.difficulty === 'medium' ? 2 : 3)
                                ? getDifficultyColor(region.difficulty || 'easy').replace('text-', 'bg-')
                                : 'bg-gray-500/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Enhanced Wildlife Preview */}
                    <div className="pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-emerald-300 font-medium">Featured Wildlife:</p>
                        <span className="text-xs text-emerald-400 font-bold">
                          {region.wildlife.length} species
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {region.wildlife.slice(0, 3).map((animal, index) => (
                          <span
                            key={index}
                            className="text-xs bg-white/20 text-white px-3 py-1 rounded-full transition-all duration-300 hover:bg-emerald-500/30 hover:text-emerald-200"
                          >
                            {animal}
                          </span>
                        ))}
                        {region.wildlife.length > 3 && (
                          <span className="text-xs bg-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full font-medium">
                            +{region.wildlife.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Hover Effect */}
                  {isHovered && isAvailable && (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl border-2 border-emerald-300/50 transition-all duration-500 animate-pulse"></div>
                  )}

                  {/* Action Button */}
                  <div className="absolute bottom-4 right-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`transition-all duration-300 ${
                        isCurrent 
                          ? 'text-emerald-300 hover:text-emerald-200' 
                          : isAvailable
                          ? 'text-white/70 group-hover:text-emerald-300'
                          : 'text-gray-400'
                      }`}
                    >
                      {isAvailable ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Current Region Badge */}
                {isCurrent && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white animate-bounce">
                    Current
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <p className="text-emerald-200 mb-6 text-lg">
              Ready to explore the wonders of nature?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Exploring
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <MapPin className="h-5 w-5 mr-2" />
                View All Regions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 