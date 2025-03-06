'use server'

import { getCustomerId } from '@/utils/paddle/get-customer-id'
import { getPaddleInstance } from '@/utils/paddle/get-paddle-instance'
import { SubscriptionResponse } from '@/lib/api.types'

export async function getSubscriptions(): Promise<SubscriptionResponse> {
  try {
    const customerId = await getCustomerId()
    if (customerId) {
      const subscriptionCollection = getPaddleInstance().subscriptions.list({ customerId: [customerId], perPage: 20 })
      const subscriptions = await subscriptionCollection.next()
      return {
        data: subscriptions,
        hasMore: subscriptionCollection.hasMore,
        totalRecords: subscriptionCollection.estimatedTotal,
      }
    }
  } catch {
    return {
      data: [],
      hasMore: false,
      totalRecords: 0,
      error: 'Something went wrong'
    }
  }
  return {
    data: [],
    hasMore: false,
    totalRecords: 0,
    error: 'Customer ID not found'
  }
}
