import { type SchemaTypeDefinition } from 'sanity'
import cars from './cars'
import Payment from './paymentForm'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cars,Payment],
}
