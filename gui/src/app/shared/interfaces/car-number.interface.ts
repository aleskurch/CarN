export interface ICarNumber {
  number: string,
  holder: string,
  registerDate: Date,
}

export type CarNumberToAdd = Omit<ICarNumber, 'registered'>
