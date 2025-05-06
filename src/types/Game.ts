import { cloneDeep, flatten, random, uniqueId, zip } from "lodash-es";
import { GameState } from "./GameState";
import { Team } from "./Team";
import type { Turn } from "./Turn";
import { useGameStore } from "@/stores/game";
import { useSettingsStore } from "@/stores/settings";

export class Game {
  id: string
  date: number
  words: number = 5
  teams: Team[] = []
  state: GameState = GameState.Score
  pointLimit: number = 20

  constructor() {
    this.id = uniqueId()
    this.date = Date.now()
    this.teams = [
      new Team('Team 1', ['Player 1', 'Player 2']),
      new Team('Team 2', ['Player 3', 'Player 4']),
    ]
  }

  get currentTurn() {
    return this.turns.length ? this.turns[this.turns.length - 1] : null
  }

  get turns(): Turn[] {
    // Make sure turns are in the correct order by zipping them
    return flatten(zip(...this.teams.map(t => t.turns))).filter(t => t !== undefined)
  }

  get players() {
    return this.teams.reduce((players, team) => players.concat(team.players), [] as string[])
  }

  async nextState() {
    const store = this
    this.state = await (async function (state) {
      switch (state) {
        case GameState.Score:
          await store.setupNextPlayer()
          return GameState.Ready
        case GameState.Ready:
          return GameState.Playing
        case GameState.Playing:
          return GameState.Score
        default:
          throw new Error(`Unknown gamestate: ${state}`)
      }
    })(this.state)
  }

  async setupNextPlayer() {
    const currentTeam = this.teams[this.turns.length % this.teams.length]
    const currentPlayer = currentTeam.players[Math.floor(this.turns.length / this.teams.length) % currentTeam.players.length]
    const { wordsPerRound } = useSettingsStore()

    const turn = {
      words: await this.generateWords(wordsPerRound),
      guessed: [],
      team: currentTeam,
      player: currentPlayer
    }

    currentTeam.turns.push(turn)
    console.log(turn, this.currentTurn)
  }

  async generateWords(amount: number) {
    const store = useGameStore()
    const words = []
    const remainingWords = cloneDeep(await store.words)

    while (words.length < amount) {
      if (!remainingWords.length) {
        throw new Error('Not enough available words')
      }

      const index = random(0, remainingWords.length - 1)
      words.push(remainingWords[index])
      remainingWords.splice(index, 1)
    }

    return words
  }

  addTeam() {
    const playerAmount = this.players.length

    this.teams.push(new Team(`Team ${this.teams.length + 1}`, [`Player ${playerAmount + 1}`, `Player ${playerAmount + 2}`]))
  }
}
