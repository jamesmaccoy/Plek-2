import { nextHandler } from '@payloadcms/next/handlers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const GET = nextHandler({
  config: configPromise,
})

export const POST = nextHandler({
  config: configPromise,
})

export const PUT = nextHandler({
  config: configPromise,
})

export const PATCH = nextHandler({
  config: configPromise,
})

export const DELETE = nextHandler({
  config: configPromise,
}) 