import { StatsDTO } from "../../dtos/StatsDTO";

export interface IGetStats {
  run(): Promise<StatsDTO>;
}
