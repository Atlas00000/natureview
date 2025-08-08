import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Snowflake, Mountain, Waves } from "lucide-react"

interface HabitatInfo {
  name: string
  icon: React.ReactNode
  description: string
  characteristics: string[]
  wildlife: string[]
  threats: string[]
}

const habitats: HabitatInfo[] = [
  {
    name: "Tundra",
    icon: <Snowflake className="h-5 w-5" />,
    description: "The treeless Arctic tundra is characterized by permafrost, low-growing vegetation, and extreme seasonal variations.",
    characteristics: [
      "Permafrost soil that never thaws completely",
      "Low-growing vegetation like mosses, lichens, and shrubs",
      "Extreme temperature variations (-40°C to 10°C)",
      "Short growing season (50-60 days)",
      "High winds and low precipitation"
    ],
    wildlife: [
      "Arctic Fox",
      "Snowy Owl", 
      "Caribou",
      "Arctic Hare",
      "Lemmings"
    ],
    threats: [
      "Climate change causing permafrost thaw",
      "Industrial development",
      "Overgrazing by herbivores",
      "Invasive species"
    ]
  },
  {
    name: "Ice Sheets",
    icon: <Snowflake className="h-5 w-5" />,
    description: "Massive glaciers and ice sheets that cover much of the Arctic, providing critical habitat for specialized wildlife.",
    characteristics: [
      "Thick layers of compressed snow and ice",
      "Extremely cold temperatures year-round",
      "Limited vegetation",
      "High albedo (reflectivity)",
      "Dynamic movement and calving"
    ],
    wildlife: [
      "Polar Bear",
      "Arctic Seal",
      "Snow Petrel",
      "Arctic Tern"
    ],
    threats: [
      "Rapid ice melt due to climate change",
      "Loss of hunting grounds for polar bears",
      "Reduced albedo effect",
      "Sea level rise"
    ]
  },
  {
    name: "Coastal Areas",
    icon: <Waves className="h-5 w-5" />,
    description: "Where land meets sea, creating rich feeding grounds and breeding areas for marine and terrestrial wildlife.",
    characteristics: [
      "Mix of terrestrial and marine environments",
      "Rich in nutrients from ocean currents",
      "Seasonal ice formation and melting",
      "Important migration corridors",
      "Diverse food sources"
    ],
    wildlife: [
      "Walrus",
      "Seals",
      "Arctic Fox",
      "Polar Bear",
      "Migratory Birds"
    ],
    threats: [
      "Oil and gas development",
      "Shipping traffic and noise pollution",
      "Overfishing",
      "Plastic pollution"
    ]
  },
  {
    name: "Pack Ice",
    icon: <Mountain className="h-5 w-5" />,
    description: "Floating sea ice that provides essential platforms for hunting, breeding, and resting for Arctic marine life.",
    characteristics: [
      "Seasonal formation and melting",
      "Dynamic movement with ocean currents",
      "Varied thickness and stability",
      "Important for marine mammal survival",
      "Critical for global climate regulation"
    ],
    wildlife: [
      "Polar Bear",
      "Ringed Seal",
      "Bearded Seal",
      "Arctic Cod",
      "Beluga Whale"
    ],
    threats: [
      "Accelerated melting due to climate change",
      "Reduced hunting success for polar bears",
      "Loss of breeding platforms for seals",
      "Disruption of food chains"
    ]
  }
]

export function HabitatTabs() {
  return (
    <Tabs defaultValue="tundra" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-sm border-0">
        {habitats.map((habitat) => (
          <TabsTrigger 
            key={habitat.name.toLowerCase()} 
            value={habitat.name.toLowerCase()}
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-blue-200 hover:text-white transition-colors border-0"
          >
            <div className="flex items-center space-x-2">
              {habitat.icon}
              <span className="hidden sm:inline">{habitat.name}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {habitats.map((habitat) => (
        <TabsContent key={habitat.name.toLowerCase()} value={habitat.name.toLowerCase()}>
          <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                {habitat.icon}
                <span>{habitat.name}</span>
              </CardTitle>
              <p className="text-blue-200 leading-relaxed">{habitat.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Characteristics</h4>
                <ul className="space-y-2">
                  {habitat.characteristics.map((char, index) => (
                    <li key={index} className="text-blue-200 text-sm flex items-start space-x-3">
                      <span className="text-blue-300 mt-1">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Wildlife</h4>
                <div className="flex flex-wrap gap-2">
                  {habitat.wildlife.map((animal, index) => (
                    <span key={index} className="bg-white/5 px-3 py-1 rounded-full text-blue-200 text-sm backdrop-blur-sm">
                      {animal}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Threats</h4>
                <ul className="space-y-2">
                  {habitat.threats.map((threat, index) => (
                    <li key={index} className="text-red-200 text-sm flex items-start space-x-3">
                      <span className="text-red-300 mt-1">⚠</span>
                      <span>{threat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
} 