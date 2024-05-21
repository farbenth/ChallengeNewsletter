export class Subscription {
  constructor(
    public id: string,
    public newsletterId: string,
    public email: string,
    public title: string,
    public decription: string,
    public subscribedAt: number,
    public unsubscribedAt?: number | null
  ) {}
}
