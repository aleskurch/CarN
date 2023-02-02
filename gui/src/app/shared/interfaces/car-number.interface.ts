export interface CarNumberInterface {
  number: string,
  holder: string,
  registerDate: Date,
}

export type CarNumberToAddInterface = Omit<CarNumberInterface, 'registerDate'>
