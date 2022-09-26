export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  nhl_id: string;
  isactive: boolean;
  isgoalie: boolean;
  isdefense: boolean;
  isforward: boolean;
  is_protected: boolean;
  primary_position: string;
}

export interface CurrentPlayer {
  id: number;
  player_id: number;
  player_status: string;
  firstname: string;
  lastname: string;
  team_name: string;
  playing_year: string;
  season_type: string;
  position: string;
}
