import { mockFetch } from './mock-fetch'
import { URL } from './types'
import React from 'react'

export function getDocuments1() {
  return mockFetch(URL.DOCUMENTS1)
}

export function getDocuments2() {
  return mockFetch(URL.DOCUMENTS2)
}

export function postCancel(arrProductID: React.Key[]) {
  return mockFetch(URL.CANCEL)
}
