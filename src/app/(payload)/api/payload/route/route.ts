/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { nextHandler } from 'payload/next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

export const GET = nextHandler({
  config: configPromise,
})

export const POST = nextHandler({
  config: configPromise,
})

export const DELETE = nextHandler({
  config: configPromise,
})

export const PATCH = nextHandler({
  config: configPromise,
})

export const PUT = nextHandler({
  config: configPromise,
})

export const OPTIONS = REST_OPTIONS(configPromise)
