import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AnimalCardProps {
  name: string
  scientificName: string
  emoji: string
  description: string
  habitat: string
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered"
  funFact: string
  imageUrl?: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Least Concern":
      return "bg-green-500/80"
    case "Near Threatened":
      return "bg-yellow-500/80"
    case "Vulnerable":
      return "bg-orange-500/80"
    case "Endangered":
      return "bg-red-500/80"
    case "Critically Endangered":
      return "bg-red-700/80"
    default:
      return "bg-gray-500/80"
  }
}

export function AnimalCard({ 
  name, 
  scientificName, 
  emoji, 
  description, 
  habitat, 
  conservationStatus, 
  funFact 
}: AnimalCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 group border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{emoji}</span>
            <div>
              <CardTitle className="text-white text-lg font-bold">{name}</CardTitle>
              <p className="text-blue-200 text-sm italic">{scientificName}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(conservationStatus)} text-white text-xs border-0`}>
            {conservationStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-blue-200 text-sm leading-relaxed">{description}</p>
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm font-medium">Habitat:</span>
          <Badge variant="outline" className="text-blue-200 border-blue-300/50 bg-white/5">
            {habitat}
          </Badge>
        </div>
        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-blue-200 text-sm">
            <span className="font-semibold text-white">Fun Fact:</span> {funFact}
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 