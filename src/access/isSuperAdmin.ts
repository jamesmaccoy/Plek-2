import type { Access } from 'payload'
import { User } from '../payload-types'

export const isSuperAdminAccess: Access = ({ req }): boolean => {
  return isSuperAdmin(req.user)
}

export const isSuperAdmin = (user: User | null): boolean => {
  return Boolean(user?.roles?.includes('super-admin'))
}

export const isAdmin = (user: User | null): boolean => {
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('super-admin'))
}
