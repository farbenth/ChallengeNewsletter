import { SubscriptionDTO } from "../../dtos/SubscriptionDTO";

export interface ISaveSubscriptions {
  run(requests: Array<SubscriptionDTO>): Promise<boolean>;
}
