export class Newsletter {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public createdAt: number,
    public content: string,
    public attachment?: string,
    public scheduledFor?: number | null
  ) {}
}
