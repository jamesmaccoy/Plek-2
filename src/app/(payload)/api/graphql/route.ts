/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { graphQLHandler } from 'payload/graphql'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { GRAPHQL_POST, REST_OPTIONS } from '@payloadcms/next/routes'

export const GET = graphQLHandler({
  config: configPromise,
})

export const POST = graphQLHandler({
  config: configPromise,
})

export const OPTIONS = REST_OPTIONS(configPromise)
