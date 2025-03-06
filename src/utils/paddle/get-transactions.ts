'use server'

import { getCustomerId } from '@/utils/paddle/get-customer-id'
import { getPaddleInstance } from '@/utils/paddle/get-paddle-instance'
import { Transaction } from '@paddle/paddle-node-sdk'
import { TransactionResponse } from '@/lib/api.types'

export async function getTransactions(): Promise<TransactionResponse> {
  try {
    const customerId = await getCustomerId()
    if (customerId) {
      const transactionCollection = getPaddleInstance().transactions.list({
        customerId: [customerId],
        perPage: 20,
      })
      const transactions = await transactionCollection.next()
      
      // Ensure we're returning the correct type
      return {
        data: transactions as Transaction[],
        hasMore: transactionCollection.hasMore,
        totalRecords: transactionCollection.estimatedTotal,
      }
    }
    return {
      data: [],
      hasMore: false,
      totalRecords: 0,
      error: 'Customer ID not found'
    }
  } catch {
    return {
      data: [],
      hasMore: false,
      totalRecords: 0,
      error: 'Something went wrong'
    }
  }
}