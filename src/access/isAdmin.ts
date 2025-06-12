import { User } from '@/payload-types'
import { Access } from 'payload'
import { isAdmin } from './isSuperAdmin'

export const isAdminAccess: Access<User> = ({ req: { user } }) => {
  if (!user) return false

  if (isAdmin(user)) {
    return true
  }

  return false
}
