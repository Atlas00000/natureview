"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Snowflake, MapPin, Thermometer, Wind, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const arcticAnimals = [
  {
    name: "Polar Bear",
    emoji: "🐻‍❄️",
    description: "The largest land carnivore on Earth, perfectly adapted to life on sea ice. These magnificent predators are excellent swimmers and can travel hundreds of miles across the Arctic Ocean.",
    habitat: "Pack Ice",
    status: "Vulnerable"
  },
  {
    name: "Arctic Fox",
    emoji: "🦊",
    description: "A master of camouflage, the Arctic fox changes its coat color with the seasons - white in winter and brown in summer. These clever canines are excellent hunters and scavengers.",
    habitat: "Tundra",
    status: "Least Concern"
  },
  {
    name: "Snowy Owl",
    emoji: "🦉",
    description: "The silent hunter of the Arctic, snowy owls are perfectly adapted to life in the frozen north. These magnificent birds can spot prey from over a mile away.",
    habitat: "Tundra",
    status: "Vulnerable"
  },
  {
    name: "Walrus",
    emoji: "🦭",
    description: "These massive marine mammals are easily recognized by their long tusks and whiskered faces. Walruses are social animals that gather in large herds on ice floes and beaches.",
    habitat: "Coastal Areas",
    status: "Vulnerable"
  },
  {
    name: "Arctic Wolf",
    emoji: "🐺",
    description: "A subspecies of the gray wolf, Arctic wolves are perfectly adapted to survive in extreme cold. They live in small packs and have incredible endurance for long hunts.",
    habitat: "Tundra",
    status: "Least Concern"
  },
  {
    name: "Caribou",
    emoji: "🦌",
    description: "Also known as reindeer, caribou are the only deer species where both males and females grow antlers. They undertake the longest land migration of any mammal.",
    habitat: "Tundra",
    status: "Vulnerable"
  }
]

export default function ArcticRegion() {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return

    autoPlayRef.current = setInterval(() => {
      if (!isTransitioning) {
        setCurrentAnimalIndex((prev) => (prev + 1) % arcticAnimals.length)
      }
    }, 6000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, isTransitioning])

  const nextAnimal = () => {
    if (isTransitioning) return
    
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    
    setIsTransitioning(true)
    setCurrentAnimalIndex((prev) => (prev + 1) % arcticAnimals.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 600)
  }

  const prevAnimal = () => {
    if (isTransitioning) return
    
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    
    setIsTransitioning(true)
    setCurrentAnimalIndex((prev) => (prev - 1 + arcticAnimals.length) % arcticAnimals.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 600)
  }

  const currentAnimal = arcticAnimals[currentAnimalIndex]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/arctic_map.png"
          alt="Arctic Region Map"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="text-6xl animate-pulse">
              <Snowflake className="text-blue-200" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
                Arctic Life
              </h1>
              <p className="text-xl text-blue-200 drop-shadow-md">
                Explore the frozen wilderness and its incredible wildlife
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* View in Habitat Button */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Button */}
              <Button 
                className="relative bg-gradient-to-r from-blue-500/80 to-cyan-500/80 hover:from-blue-400/90 hover:to-cyan-400/90 text-white border-0 backdrop-blur-sm px-10 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-blue-500/50 animate-bounce"
              >
                <Eye className="h-6 w-6 mr-3 animate-pulse" />
                View in Habitat
                <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              </Button>
              
              {/* Floating particles effect */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-300 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-cyan-300 rounded-full animate-ping delay-300"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-700"></div>
            </div>
          </div>

          {/* Animals Overview Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                🐾 Animals Overview
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevAnimal}
                  disabled={isTransitioning}
                  className="text-white hover:bg-white/20 p-2 transition-all duration-300 disabled:opacity-50 hover:scale-110"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex space-x-1">
                  {arcticAnimals.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-400 ease-out ${
                        index === currentAnimalIndex ? 'bg-white scale-125' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextAnimal}
                  disabled={isTransitioning}
                  className="text-white hover:bg-white/20 p-2 transition-all duration-300 disabled:opacity-50 hover:scale-110"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Animal Slideshow */}
            <div className="relative overflow-hidden">
              <div 
                className={`will-change-opacity transition-opacity duration-600 ease-out ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  perspective: '1000px'
                }}
              >
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4 animate-pulse">
                    {currentAnimal.emoji}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {currentAnimal.name}
                  </h3>
                  <div className="flex justify-center space-x-4 mb-4">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-blue-200 text-sm backdrop-blur-sm border border-white/20">
                      {currentAnimal.habitat}
                    </span>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-blue-200 text-sm backdrop-blur-sm border border-white/20">
                      {currentAnimal.status}
                    </span>
                  </div>
                </div>
                <p className="text-blue-200 text-lg leading-relaxed text-center max-w-3xl mx-auto">
                  {currentAnimal.description}
                </p>
              </div>
            </div>

            {/* Environment Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <Thermometer className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Temperature</h4>
                <p className="text-blue-200 text-sm">-40°C to -10°C</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <Wind className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Climate</h4>
                <p className="text-blue-200 text-sm">Extreme Cold</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <MapPin className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Location</h4>
                <p className="text-blue-200 text-sm">North Pole Region</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 