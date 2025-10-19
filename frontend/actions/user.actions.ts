'use server'

import { getCurrentUser } from '@/data/dal'
import { tryCatch } from '@shared/lib/utils'

export async function getProfile() {
  return tryCatch(async () => {
    const user = await getCurrentUser()
    return user
  })
}
