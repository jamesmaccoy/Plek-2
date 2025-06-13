import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const getPayloadClient = async () => {
  return getPayload({ config: configPromise })
} 