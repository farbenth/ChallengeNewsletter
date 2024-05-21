import { SubscriptionDTO } from "../../dtos/SubscriptionDTO";

export interface IGetSubscriptionsByEmail {
  run(requests: { email: string }): Promise<Array<SubscriptionDTO>>;
}
