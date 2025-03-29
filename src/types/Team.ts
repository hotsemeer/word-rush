import { shuffle } from "lodash-es"
import type { Turn } from "./Turn"

export class Team {
  name: string
  players: string[]
  turns: Turn[] = []

  get points() {
    return 0
  }

  constructor(name: string, players: string[]) {
    this.name = name
    this.players = players
  }

  shuffle() {
    this.players = shuffle(this.players)
  }
}
