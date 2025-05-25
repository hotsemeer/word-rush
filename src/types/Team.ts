import { shuffle } from "lodash-es"
import type { Turn } from "./Turn"
import uniqid from 'uniqid'

export class Team {
  id: string
  name: string
  players: string[]
  turns: Turn[] = []

  get points() {
    return this.turns.reduce((total, turn) => total + turn.guessed.length, 0)
  }

  constructor(name: string, players: string[], turns: Turn[] = [], id: string = uniqid()) {
    this.id = id
    this.name = name
    this.players = players
    this.turns = turns
  }

  shuffle() {
    this.players = shuffle(this.players)
  }
}
