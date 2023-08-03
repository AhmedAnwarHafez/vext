import { faker } from '@faker-js/faker'

export function randomName() {
  return `${faker.word.adjective()} ${faker.word.noun()}`
}
