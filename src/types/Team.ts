import { shuffle, uniqueId } from "lodash-es"
import type { Turn } from "./Turn"

export class Team {
  id: string
  name: string
  players: string[]
  turns: Turn[] = []

  get points() {
    return this.turns.reduce((total, turn) => total + turn.guessed.length, 0)
  }

  constructor(name: string, players: string[]) {
    this.id = uniqueId()
    this.name = name
    this.players = players
  }

  shuffle() {
    this.players = shuffle(this.players)
  }
}
