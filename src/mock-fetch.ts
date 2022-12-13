import { Product, URL } from './types'
import { v4 as uuidv4 } from 'uuid'

const products1: Product[] = [
  {
    id: uuidv4(),
    status: 'active',
    sum: 1500,
    qty: 5,
    volume: 5,
    name: 'Кроссовки',
    delivery_date: '19.12.22',
    currency: '₽'
  },
  {
    id: uuidv4(),
    status: 'archive',
    sum: 2500,
    qty: 10,
    volume: 10,
    name: 'Брюки',
    delivery_date: '01.01.23',
    currency: '₽'
  },
  {
    id: uuidv4(),
    status: 'active',
    sum: 500,
    qty: 15,
    volume: 15,
    name: 'Шапка',
    delivery_date: '19.01.23',
    currency: '₽'
  }
]

const products2: Product[] = [
  {
    id: uuidv4(),
    status: 'active',
    sum: 120000,
    qty: 55,
    volume: 55,
    name: 'Айфон',
    delivery_date: '19.12.22',
    currency: '₽'
  },
  {
    id: uuidv4(),
    status: 'active',
    sum: 220000,
    qty: 20,
    volume: 20,
    name: 'Макбук',
    delivery_date: '01.01.23',
    currency: '₽'
  },
  {
    id: uuidv4(),
    status: 'archive',
    sum: 17000,
    qty: 35,
    volume: 35,
    name: 'Процессор X',
    delivery_date: '19.01.23',
    currency: '₽'
  }
]

const data = {
  '/documents1': products1,
  '/documents2': products2,
  '/cancel': [...products1, ...products2]
}

function delay(val: Product[]): Promise<Product[]> {
  return new Promise((res, rej) => setTimeout(val ? res : rej, 0, val))
}

export function mockFetch(url: URL) {
  const payload = data[url]

  return delay(payload)
}
