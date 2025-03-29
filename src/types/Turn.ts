import type { Team } from "./Team"

export interface Turn {
  words: string[]
  guessed: string[]
  team: Team
  player: string
}
