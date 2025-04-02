import { clone, cloneDeep, flatten, flattenDeep, random } from "lodash-es";
import { GameState } from "./GameState";
import { Team } from "./Team";
import type { Turn } from "./Turn";
import { words as allWords } from '@/assets/words/index'

export class Game {
  words: number = 5
  teams: Team[] = []
  state: GameState = GameState.Score
  pointLimit: number = 20

  constructor() {
    this.teams = [
      new Team('Team 1', ['Player 1', 'Player 2']),
      new Team('Team 2', ['Player 3', 'Player 4']),
    ]
  }

  get currentTurn() {
    return this.turns.length ? this.turns[this.turns.length - 1] : null
  }

  get turns(): Turn[] {
    return flatten(this.teams.map(t => t.turns))
  }

  get players() {
    return this.teams.reduce((players, team) => players.concat(team.players), [] as string[])
  }

  nextState() {
    const store = this
    this.state = (function (state) {
      switch (state) {
        case GameState.Score:
          store.setupNextPlayer()
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

  setupNextPlayer() {
    const currentTeam = this.teams[this.turns.length % this.teams.length]
    const currentPlayer = currentTeam.players[Math.floor(this.turns.length / this.teams.length) % currentTeam.players.length]

    currentTeam.turns.push({
      words: this.generateWords(5),
      guessed: [],
      team: currentTeam,
      player: currentPlayer
    })
  }

  generateWords(amount: number) {
    const words = []
    const remainingWords = cloneDeep(allWords)

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
