'use server'

import { getCustomerId } from '@/utils/paddle/get-customer-id'
import { getErrorMessage } from '@/utils/paddle/data-helpers'
import { getPaddleInstance } from '@/utils/paddle/get-paddle-instance'
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
      return {
        data: transactions,
        hasMore: transactionCollection.hasMore,
        totalRecords: transactionCollection.estimatedTotal,
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return getErrorMessage()
  }
  return getErrorMessage()
}
