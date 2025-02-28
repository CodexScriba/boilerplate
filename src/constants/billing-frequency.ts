export interface IBillingFrequency {
  id: 'month' | 'year'
  name: string
  discount?: number
}

export const BillingFrequency: IBillingFrequency[] = [
  {
    id: 'month',
    name: 'Monthly',
  },
  {
    id: 'year',
    name: 'Yearly',
    discount: 20,
  },
]
