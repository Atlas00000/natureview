"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, ChevronRight, Play, Info, X } from "lucide-react"

interface Region {
  id: string
  name: string
  displayName: string
  description: string
  position: { x: number; y: number }
  mobilePosition?: { x: number; y: number }
  color: string
  wildlife: string[]
  icon?: string // Added for new panel
}

const regions: Region[] = [
  {
    id: "arctic",
    name: "Arctic Life",
    displayName: "Arctic Life",
    description: "Explore the frozen wilderness of the Arctic",
    position: { x: 20, y: 35 },
    mobilePosition: { x: 25, y: 40 },
    color: "from-blue-400 to-cyan-500",
    wildlife: ["Polar Bear", "Arctic Fox", "Snowy Owl", "Seal"],
    icon: "🐻" // Added for new panel
  },
  {
    id: "alpine",
    name: "Alpine Heights",
    displayName: "Alpine Heights",
    description: "Discover mountain wildlife and rugged terrain",
    position: { x: 20, y: 55 },
    mobilePosition: { x: 25, y: 60 },
    color: "from-gray-400 to-blue-400",
    wildlife: ["Mountain Goat", "Golden Eagle", "Marmot", "Alpine Ibex"],
    icon: "🏔️" // Added for new panel
  },
  {
    id: "coastal",
    name: "Coastal Waters",
    displayName: "Coastal Waters",
    description: "Dive into marine life and ocean ecosystems",
    position: { x: 70, y: 30 },
    mobilePosition: { x: 75, y: 35 },
    color: "from-blue-500 to-cyan-600",
    wildlife: ["Harbor Seal", "Humpback Whale", "Seagull", "Atlantic Cod"],
    icon: "🐳" // Added for new panel
  },
  {
    id: "forest",
    name: "Forest Realm",
    displayName: "Forest Realm",
    description: "Wander through dense forests and woodland creatures",
    position: { x: 75, y: 50 },
    mobilePosition: { x: 75, y: 55 },
    color: "from-green-500 to-emerald-600",
    wildlife: ["Gray Wolf", "Red Deer", "Great Horned Owl", "Red Fox"],
    icon: "🌲" // Added for new panel
  },
  {
    id: "global",
    name: "Global Safari",
    displayName: "Global Safari",
    description: "Experience wildlife from around the world",
    position: { x: 75, y: 60 },
    mobilePosition: { x: 75, y: 70 },
    color: "from-yellow-500 to-orange-500",
    wildlife: ["Lion", "Elephant", "Giraffe", "Zebra"],
    icon: "🌎" // Added for new panel
  }
]

export function InteractiveMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (selectedRegion) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedRegion])

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (selectedRegion) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedRegion])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId)
  }

  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId)
  }

  // Helper functions for new panel
  const getAnimalIcon = (animal: string) => {
    switch (animal) {
      case "Polar Bear": return "🐻";
      case "Arctic Fox": return "🦊";
      case "Snowy Owl": return "🦉";
      case "Seal": return "🐳";
      case "Mountain Goat": return "🐐";
      case "Golden Eagle": return "🦅";
      case "Marmot": return "🐀";
      case "Alpine Ibex": return "🐐";
      case "Harbor Seal": return "🐳";
      case "Humpback Whale": return "🐳";
      case "Seagull": return "🐦";
      case "Atlantic Cod": return "🐟";
      case "Gray Wolf": return "🐺";
      case "Red Deer": return "🦌";
      case "Great Horned Owl": return "🦉";
      case "Red Fox": return "🦊";
      case "Lion": return "🦁";
      case "Elephant": return "🐘";
      case "Giraffe": return "🦒";
      case "Zebra": return "🦓";
      default: return "🌍";
    }
  };

  const getAnimalFact = (animal: string) => {
    switch (animal) {
      case "Polar Bear": return "Polar bears are the largest carnivores in the Arctic. They can weigh up to 800kg and are excellent swimmers.";
      case "Arctic Fox": return "Arctic foxes are the smallest fox species, adapted for cold temperatures. They have thick fur and small ears.";
      case "Snowy Owl": return "Snowy owls are one of the most beautiful owls, with a white plumage that helps them blend into snowy landscapes.";
      case "Seal": return "Seals are marine mammals that live in the Arctic and Antarctic oceans. They are excellent swimmers and divers.";
      case "Mountain Goat": return "Mountain goats are strong climbers and can jump up to 30 feet in length. They are also known for their aggressive behavior.";
      case "Golden Eagle": return "Golden eagles are the largest eagles in North America. They are known for their impressive hunting skills and long flight.";
      case "Marmot": return "Marmots are ground squirrels that hibernate during winter. They are known for their large cheek pouches and their ability to store food.";
      case "Alpine Ibex": return "Alpine ibex are mountain goats that are adapted for life in rocky, mountainous environments. They are known for their impressive horns.";
      case "Harbor Seal": return "Harbor seals are one of the most common seals found in coastal areas. They are excellent swimmers and can dive for extended periods.";
      case "Humpback Whale": return "Humpback whales are known for their distinctive song, which they use for communication and mating. They are also known for their acrobatic behavior.";
      case "Seagull": return "Seagulls are a common sight at coastal areas. They are known for their ability to fly long distances and their scavenging behavior.";
      case "Atlantic Cod": return "Atlantic cod are a commercially important fish species. They are known for their large size and are a key food source for many marine animals.";
      case "Gray Wolf": return "Gray wolves are apex predators and are known for their social structure and hunting skills.";
      case "Red Deer": return "Red deer are one of the largest deer species. They are known for their impressive antlers and their ability to adapt to various environments.";
      case "Great Horned Owl": return "Great horned owls are one of the largest owl species. They are known for their distinctive hooting call and their hunting skills.";
      case "Red Fox": return "Red foxes are adaptable and can live in various environments. They are known for their cunning and their ability to adapt to human presence.";
      case "Lion": return "Lions are one of the most iconic African predators. They are known for their strength and their hunting skills.";
      case "Elephant": return "Elephants are the largest land animals. They are known for their intelligence and their ability to form strong social bonds.";
      case "Giraffe": return "Giraffes are the tallest mammals. They are known for their long necks and their unique tongue.";
      case "Zebra": return "Zebras are known for their distinctive stripes and their ability to run at high speeds.";
      default: return "No specific fact available.";
    }
  };

  const getAnimalHabitat = (animal: string) => {
    switch (animal) {
      case "Polar Bear": return "Arctic Tundra";
      case "Arctic Fox": return "Arctic Tundra";
      case "Snowy Owl": return "Arctic Tundra";
      case "Seal": return "Arctic and Antarctic Oceans";
      case "Mountain Goat": return "Mountainous Terrain";
      case "Golden Eagle": return "Mountainous Terrain";
      case "Marmot": return "Rocky Mountainous Terrain";
      case "Alpine Ibex": return "Rocky Mountainous Terrain";
      case "Harbor Seal": return "Coastal Waters";
      case "Humpback Whale": return "Coastal Waters";
      case "Seagull": return "Coastal Areas";
      case "Atlantic Cod": return "Coastal Waters";
      case "Gray Wolf": return "Various Terrain";
      case "Red Deer": return "Various Terrain";
      case "Great Horned Owl": return "Various Terrain";
      case "Red Fox": return "Various Terrain";
      case "Lion": return "Various Terrain";
      case "Elephant": return "Various Terrain";
      case "Giraffe": return "Various Terrain";
      case "Zebra": return "Various Terrain";
      default: return "Unknown Habitat";
    }
  };

  const getSpeciesCount = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (region) {
      return region.wildlife.length;
    }
    return 0;
  };

  const getConservationStatus = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (region) {
      // Simple logic for demonstration
      if (region.wildlife.length > 10) return "Stable";
      if (region.wildlife.length > 5) return "Threatened";
      return "Endangered";
    }
    return "Unknown";
  };

  const getClimateType = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (region) {
      if (region.id === "arctic") return "Arctic Tundra";
      if (region.id === "alpine") return "Alpine";
      if (region.id === "coastal") return "Marine";
      if (region.id === "forest") return "Temperate Forest";
      if (region.id === "global") return "Various";
    }
    return "Unknown";
  };

  const getExplorationLevel = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (region) {
      if (region.id === "arctic") return "Highly Remote";
      if (region.id === "alpine") return "Difficult";
      if (region.id === "coastal") return "Accessible";
      if (region.id === "forest") return "Moderate";
      if (region.id === "global") return "Well-Known";
    }
    return "Unknown";
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Map Image - Full Screen */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src="/assets/homepage.png"
            alt="Nature View World Map"
            className="w-auto h-auto max-w-full max-h-full object-contain opacity-95 animate-scale-in"
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
          
          {/* Interactive Region Points */}
          {regions.map((region) => {
            const isHovered = hoveredRegion === region.id
            const isSelected = selectedRegion === region.id
            
            return (
              <div
                key={region.id}
                className="absolute cursor-pointer transition-all duration-500 group"
                style={{
                  left: `${isMobile && region.mobilePosition ? region.mobilePosition.x : region.position.x}%`,
                  top: `${isMobile && region.mobilePosition ? region.mobilePosition.y : region.position.y}%`,
                  transform: 'translate(-50%, -50%)' // Center the point
                }}
                onMouseEnter={() => handleRegionHover(region.id)}
                onMouseLeave={() => handleRegionHover(null)}
                onClick={() => handleRegionClick(region.id)}
              >
                {/* Clickable Point */}
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all duration-500 ${
                    isSelected
                      ? 'bg-white border-white shadow-lg shadow-white/50 scale-125'
                      : isHovered
                      ? 'bg-white/80 border-white/80 scale-110'
                      : 'bg-white/20 border-white/60 hover:bg-white/40 hover:border-white'
                  }`}
                />
                
                {/* Pulse Effect for Hover */}
                {isHovered && (
                  <div className="absolute inset-0 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/80 animate-pulse" 
                       style={{ transform: 'translate(-50%, -50%)' }} />
                )}
                
                {/* Region Label */}
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 rounded-full text-xs md:text-sm font-bold transition-all duration-500 whitespace-nowrap ${
                    isSelected || isHovered
                      ? 'bg-white text-gray-900 shadow-lg scale-110'
                      : 'bg-black/60 text-white'
                  }`}
                >
                  {region.displayName}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mind-Blowing Region Info Panel */}
      {selectedRegion && (
        <>
          {/* Animated Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 animate-fade-in"
            onClick={() => setSelectedRegion(null)}
            style={{ pointerEvents: 'auto' }}
          />
          
          {/* Enhanced Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl animate-scale-in max-w-4xl w-full max-h-[90vh] overflow-hidden animate-glow-pulse">
              
              {/* Panel Header with Region Icon */}
              <div className="relative p-8 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-6xl animate-bounce-gentle animate-shimmer">
                      {regions.find(r => r.id === selectedRegion)?.icon || "🌍"}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-fade-in">
                        {regions.find(r => r.id === selectedRegion)?.displayName}
                      </h2>
                      <p className="text-emerald-200 text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        {regions.find(r => r.id === selectedRegion)?.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 animate-glow-pulse"
                      onClick={() => {
                        setSelectedRegion(null)
                        window.location.href = `/regions/${selectedRegion}`
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Explore
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedRegion(null)}
                      className="text-white hover:bg-white/20 rounded-full p-2 hover:scale-110 transition-all duration-300"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Panel Content - Fixed height with internal scrolling */}
              <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                
                {/* Wildlife Gallery with Facts */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    🦁 Wildlife Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regions.find(r => r.id === selectedRegion)?.wildlife.map((animal, index) => (
                      <div
                        key={animal}
                        className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300 animate-fade-in group hover:animate-glow-pulse"
                        style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                      >
                        <div className="text-4xl mb-4 animate-bounce-gentle">{getAnimalIcon(animal)}</div>
                        <h4 className="text-xl font-bold text-white mb-3">{animal}</h4>
                        <p className="text-emerald-200 text-sm mb-4 leading-relaxed">
                          {getAnimalFact(animal)}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-emerald-300 font-medium">
                            {getAnimalHabitat(animal)}
                          </span>
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Region Stats */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    📊 Region Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Species Count", value: getSpeciesCount(selectedRegion), icon: "🐾", color: "text-emerald-300" },
                      { label: "Conservation Status", value: getConservationStatus(selectedRegion), icon: "🛡️", color: "text-blue-300" },
                      { label: "Climate Type", value: getClimateType(selectedRegion), icon: "🌡️", color: "text-yellow-300" },
                      { label: "Exploration Level", value: getExplorationLevel(selectedRegion), icon: "🗺️", color: "text-purple-300" }
                    ].map((stat, index) => (
                      <div
                        key={stat.label}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center animate-fade-in hover:scale-105 transition-all duration-300 hover:animate-glow-pulse"
                        style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                      >
                        <div className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</div>
                        <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-emerald-200">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Action Buttons - Responsive */}
      <div className="absolute top-20 md:top-8 right-4 md:right-8 flex flex-col space-y-2 md:space-y-3">
        <Button
          size="sm"
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-xs md:text-sm"
        >
          <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">All Regions</span>
          <span className="sm:hidden">Regions</span>
        </Button>
        
      </div>

      {/* Click outside to deselect */}
      {selectedRegion && (
        <div
          className="absolute inset-0 z-10"
          onClick={() => setSelectedRegion(null)}
        />
      )}
    </section>
  )
} 