import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPayloadClient } from '@/get-payload'
import { Page } from '@/payload-types'

interface Props {
  params: {
    tenant: string
    slug: string[]
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tenant, slug } = params
  const payload = await getPayloadClient()

  try {
    const page = await payload.find({
      collection: 'pages',
      where: {
        tenant: {
          equals: tenant,
        },
        slug: {
          equals: slug.join('/'),
        },
      },
    })

    if (!page.docs[0]) {
      return {
        title: 'Page Not Found',
      }
    }

    return {
      title: page.docs[0].title,
      description: page.docs[0].description,
    }
  } catch (error) {
    return {
      title: 'Error',
    }
  }
}

export default async function TenantPage({ params }: Props) {
  const { tenant, slug } = params
  const payload = await getPayloadClient()

  try {
    const page = await payload.find({
      collection: 'pages',
      where: {
        tenant: {
          equals: tenant,
        },
        slug: {
          equals: slug.join('/'),
        },
      },
    })

    if (!page.docs[0]) {
      return notFound()
    }

    const pageData = page.docs[0] as Page

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{pageData.title}</h1>
        {pageData.description && (
          <p className="text-lg mb-8">{pageData.description}</p>
        )}
        
        {/* Display Plek details */}
        {pageData.baseRate && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Base Rate</h2>
            <p className="text-xl">${pageData.baseRate} per night</p>
          </div>
        )}

        {/* Display Package Types */}
        {pageData.packageTypes && pageData.packageTypes.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Available Packages</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pageData.packageTypes.map((pkg, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  {pkg.description && (
                    <p className="text-gray-600 mb-2">{pkg.description}</p>
                  )}
                  {pkg.price && (
                    <p className="text-lg font-medium">${pkg.price}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching page:', error)
    return notFound()
  }
}
