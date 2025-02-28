import { SubscriptionResponse, TransactionResponse } from '@/lib/api.types'

export function parseSDKResponse<T>(data: T) {
  return {
    data,
    hasMore: false,
    totalRecords: 0,
  }
}

export function getErrorMessage(): SubscriptionResponse | TransactionResponse {
  return {
    error: 'Something went wrong',
    hasMore: false,
    totalRecords: 0,
  }
}

export interface ErrorMessage {
  error: string
}
