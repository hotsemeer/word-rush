import { Game } from "@/types/Game"
import { Team } from "@/types/Team"
import type { Turn } from "@/types/Turn"

function serializeGame(game: Game) {
  return {
    id: game.id,
    date: game.date,
    state: game.state,
    pointLimit: game.pointLimit,
    teams: game.teams.map(team => ({
      id: team.id,
      name: team.name,
      players: team.players,
      turns: team.turns.map(turn => ({
        words: turn.words,
        guessed: turn.guessed,
        teamId: turn.team.id, // Store team ID instead of team reference
        player: turn.player
      }))
    }))
  }
}

// Helper function to deserialize a game (restore object structure)
function deserializeGame(data: Game): Game {
  const game = new Game()

  // Restore basic properties
  game.id = data.id
  game.date = data.date
  game.state = data.state
  game.pointLimit = data.pointLimit

  // Clear default teams and restore from data
  game.teams = []

  data.teams?.forEach((teamData: Team) => {
    const team = new Team(teamData.name, teamData.players, teamData.turns, teamData.id)
    team.id = teamData.id

    // Restore turns and recreate team references
    team.turns = teamData.turns?.map((turnData: Turn) => ({
      words: turnData.words,
      guessed: turnData.guessed,
      team: team, // Recreate the team reference
      player: turnData.player
    })) || []

    game.teams.push(team)
  })

  return game
}

export { deserializeGame, serializeGame }
