export interface ArcticAnimal {
  name: string
  scientificName: string
  emoji: string
  description: string
  habitat: string
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered"
  funFact: string
  diet: string
  lifespan: string
  size: string
}

export const arcticWildlife: ArcticAnimal[] = [
  {
    name: "Polar Bear",
    scientificName: "Ursus maritimus",
    emoji: "🐻‍❄️",
    description: "The largest land carnivore on Earth, perfectly adapted to life on sea ice. These magnificent predators are excellent swimmers and can travel hundreds of miles across the Arctic Ocean.",
    habitat: "Pack Ice",
    conservationStatus: "Vulnerable",
    funFact: "Polar bears have black skin under their white fur, and their fur is actually transparent, not white!",
    diet: "Primarily seals, especially ringed and bearded seals",
    lifespan: "20-30 years in the wild",
    size: "Males: 2.4-3m, 350-700kg; Females: 1.8-2.4m, 150-250kg"
  },
  {
    name: "Arctic Fox",
    scientificName: "Vulpes lagopus",
    emoji: "🦊",
    description: "A master of camouflage, the Arctic fox changes its coat color with the seasons - white in winter and brown in summer. These clever canines are excellent hunters and scavengers.",
    habitat: "Tundra",
    conservationStatus: "Least Concern",
    funFact: "Arctic foxes can survive temperatures as low as -70°C and have the warmest fur of any mammal!",
    diet: "Lemmings, voles, birds, eggs, carrion, and berries",
    lifespan: "3-6 years in the wild",
    size: "46-68cm body length, 2.5-9kg"
  },
  {
    name: "Snowy Owl",
    scientificName: "Bubo scandiacus",
    emoji: "🦉",
    description: "The silent hunter of the Arctic, snowy owls are perfectly adapted to life in the frozen north. These magnificent birds can spot prey from over a mile away.",
    habitat: "Tundra",
    conservationStatus: "Vulnerable",
    funFact: "Snowy owls are diurnal (active during day) unlike most owls, and can rotate their heads 270 degrees!",
    diet: "Lemmings, voles, hares, birds, and fish",
    lifespan: "9-10 years in the wild",
    size: "52-71cm body length, 1.6-3kg, wingspan up to 1.5m"
  },
  {
    name: "Arctic Seal",
    scientificName: "Pusa hispida",
    emoji: "🦭",
    description: "Ringed seals are the most abundant seal in the Arctic and are perfectly adapted to life under the ice. They create breathing holes in the ice and can dive to depths of 300 feet.",
    habitat: "Pack Ice",
    conservationStatus: "Least Concern",
    funFact: "Ringed seals can hold their breath for up to 45 minutes and can dive to depths of 300 feet!",
    diet: "Fish, crustaceans, and invertebrates",
    lifespan: "25-30 years",
    size: "1.1-1.5m body length, 50-110kg"
  },
  {
    name: "Walrus",
    scientificName: "Odobenus rosmarus",
    emoji: "🦭",
    description: "These massive marine mammals are easily recognized by their long tusks and whiskered faces. Walruses are social animals that gather in large herds on ice floes and beaches.",
    habitat: "Coastal Areas",
    conservationStatus: "Vulnerable",
    funFact: "Walrus tusks can grow up to 1 meter long and are actually elongated canine teeth!",
    diet: "Clams, mussels, and other bottom-dwelling invertebrates",
    lifespan: "40-50 years",
    size: "2.2-3.6m body length, 400-1700kg"
  },
  {
    name: "Arctic Wolf",
    scientificName: "Canis lupus arctos",
    emoji: "🐺",
    description: "A subspecies of the gray wolf, Arctic wolves are perfectly adapted to survive in extreme cold. They live in small packs and have incredible endurance for long hunts.",
    habitat: "Tundra",
    conservationStatus: "Least Concern",
    funFact: "Arctic wolves have two layers of fur and can survive temperatures as low as -70°C!",
    diet: "Caribou, muskoxen, Arctic hares, and lemmings",
    lifespan: "7-10 years in the wild",
    size: "1-1.8m body length, 25-80kg"
  },
  {
    name: "Caribou",
    scientificName: "Rangifer tarandus",
    emoji: "🦌",
    description: "Also known as reindeer, caribou are the only deer species where both males and females grow antlers. They undertake the longest land migration of any mammal.",
    habitat: "Tundra",
    conservationStatus: "Vulnerable",
    funFact: "Caribou can run at speeds up to 80 km/h and their hooves change with the seasons - soft in summer, hard in winter!",
    diet: "Lichens, mosses, grasses, and shrubs",
    lifespan: "10-15 years in the wild",
    size: "1.6-2.1m body length, 80-300kg"
  },
  {
    name: "Arctic Hare",
    scientificName: "Lepus arcticus",
    emoji: "🐰",
    description: "These large hares are perfectly adapted to the Arctic environment with thick fur and large feet that act like snowshoes. They can reach speeds of 60 km/h when escaping predators.",
    habitat: "Tundra",
    conservationStatus: "Least Concern",
    funFact: "Arctic hares can jump up to 2 meters high and their fur changes from brown in summer to white in winter!",
    diet: "Willow, birch, grasses, and lichens",
    lifespan: "5 years in the wild",
    size: "43-70cm body length, 2.5-7kg"
  },
  {
    name: "Beluga Whale",
    scientificName: "Delphinapterus leucas",
    emoji: "🐋",
    description: "Known as the 'canary of the sea' for their vocalizations, beluga whales are highly social and intelligent marine mammals. They can swim backwards and are excellent divers.",
    habitat: "Coastal Areas",
    conservationStatus: "Near Threatened",
    funFact: "Beluga whales are the only whales that can turn their heads from side to side, and they can swim backwards!",
    diet: "Fish, squid, octopus, and crustaceans",
    lifespan: "50-80 years",
    size: "3-5.5m body length, 700-1600kg"
  },
  {
    name: "Arctic Tern",
    scientificName: "Sterna paradisaea",
    emoji: "🦅",
    description: "These incredible birds make the longest migration of any animal, traveling from the Arctic to Antarctica and back each year. They spend more time in daylight than any other creature.",
    habitat: "Coastal Areas",
    conservationStatus: "Least Concern",
    funFact: "Arctic terns can live up to 30 years and may travel over 2.4 million kilometers in their lifetime - equivalent to 3 trips to the moon!",
    diet: "Small fish, crustaceans, and marine worms",
    lifespan: "20-30 years",
    size: "28-39cm body length, 85-125g, wingspan 65-75cm"
  }
] 