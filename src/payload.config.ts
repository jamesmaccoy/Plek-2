import { buildConfig } from 'payload'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import type { Access, FieldAccess } from 'payload'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: 'users',
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'roles',
          type: 'select',
          hasMany: true,
          options: [
            {
              label: 'Super Admin',
              value: 'super-admin',
            },
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'User',
              value: 'user',
            },
          ],
          defaultValue: ['user'],
          required: true,
        },
      ],
      access: {
        read: () => true,
        create: () => true,
        update: ({ req: { user } }): boolean => {
          if (!user) return false
          return Boolean(user.roles?.includes('super-admin') || user.roles?.includes('admin'))
        },
        delete: ({ req: { user } }): boolean => {
          if (!user) return false
          return Boolean(user.roles?.includes('super-admin'))
        },
      },
    },
    {
      slug: 'tenants',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'domain',
          type: 'text',
          required: true,
          unique: true,
        },
      ],
    },
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      access: {
        read: () => true,
        create: ({ req: { user } }): boolean => {
          if (!user) return false
          return Boolean(user.roles?.includes('super-admin') || user.roles?.includes('admin'))
        },
        update: ({ req: { user } }): boolean => {
          if (!user) return false
          return Boolean(user.roles?.includes('super-admin') || user.roles?.includes('admin'))
        },
        delete: ({ req: { user } }): boolean => {
          if (!user) return false
          return Boolean(user.roles?.includes('super-admin'))
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'baseRate',
          type: 'number',
          min: 0,
        },
        {
          name: 'packageTypes',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'price',
              type: 'number',
              min: 0,
            },
          ],
        },
      ],
    },
  ],
  plugins: [
    multiTenantPlugin({
      collections: {
        pages: {},
      },
      tenantField: {
        access: {
          read: () => true,
          update: ({ req: { user } }): boolean => {
            if (!user) return false
            return Boolean(user.roles?.includes('super-admin') || user.roles?.includes('admin'))
          },
        },
      },
      userHasAccessToAllTenants: (user): boolean => {
        return Boolean(user?.roles?.includes('super-admin'))
      },
    }),
    redirectsPlugin({}),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET || '',
})
