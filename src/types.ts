import React from 'react'

export enum URL {
  DOCUMENTS1 = '/documents1',
  DOCUMENTS2 = '/documents2',
  CANCEL = '/cancel'
}

export interface Product {
  id: string
  status: string
  sum: number
  qty: number
  volume: number
  name: string
  delivery_date: string
  currency: string
}

export interface DataType {
  key: React.Key
  status: React.ReactElement
  sum: string | number
  qty: string | number
  volume: string | number
  name: string
  delivery_date: string
  currency: string
  total: string
}
