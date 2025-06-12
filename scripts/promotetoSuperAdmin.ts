import payload from 'payload'
import config from '@/payload.config' // adjust path if needed

const promoteToSuperAdmin = async () => {
  await payload.init({ config })
  const userId = '6799e7d1ef9b138ffdf507d3'
  const user = await payload.findByID({
    collection: 'users',
    id: userId,
  })
  if (!user.roles?.includes('super-admin')) {
    await payload.update({
      collection: 'users',
      id: userId,
      data: {
        roles: [...(user.roles || []), 'super-admin'],
      },
    })
    console.log('User promoted to super-admin.')
  } else {
    console.log('User is already a super-admin.')
  }
  process.exit(0)
}

promoteToSuperAdmin()