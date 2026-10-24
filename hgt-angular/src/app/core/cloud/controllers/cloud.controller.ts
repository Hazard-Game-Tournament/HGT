import { CharacterCloudStorage } from '../character-storage';
import { GameStateCloudStorage } from '../game-state-storage';
import { GenealogyCloudStorage } from '../genealogy/genealogy-storage';
import { TournamentCloudStorage } from '../tournament-storage';
import { CloudControllerOptions } from './controller.models';
import { GenealogyCloudController } from './genealogy.controller';
import { StateCloudController } from './state.controller';
import { TournamentCloudController } from './tournament.controller';

export class CloudController {
  readonly genealogy: GenealogyCloudController;
  readonly state: StateCloudController;
  readonly tournaments: TournamentCloudController;

  constructor(
    readonly characters: CharacterCloudStorage,
    genealogy: GenealogyCloudStorage,
    tournaments: TournamentCloudStorage,
    gameState: GameStateCloudStorage,
    readonly options: CloudControllerOptions
  ) {
    this.genealogy =
      new GenealogyCloudController(genealogy);

    this.tournaments =
      new TournamentCloudController(
        tournaments,
        options.keepTournamentSeasons
      );

    this.state =
      new StateCloudController(gameState);
  }
}
