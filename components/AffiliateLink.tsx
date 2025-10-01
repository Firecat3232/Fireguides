import { affiliateLinks } from '../config/affiliate.config'

type AffiliateLinkProps = {
  id: keyof typeof affiliateLinks
  children: React.ReactNode
}

export default function AffiliateLink({ id, children }: AffiliateLinkProps) {
  const url = affiliateLinks[id] || '#'
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
      {children}
    </a>
  )
}
