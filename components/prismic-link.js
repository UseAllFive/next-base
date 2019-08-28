/* eslint-disable react/prop-types */
import { Link as Link2 } from 'prismic-reactjs'
import Link from 'next/link'
import { linkResolver } from '../utils/link-resolver'

export const PrismicLink = (props) => {
    const { link, children } = props
    const href = Link2.url(link, linkResolver)
    let target = {}
    if (link.target) {
        target = {
            target: link.target,
            rel: 'noopener',
        }
    }
    if (link.link_type === 'Document') {
        return (
            <Link prefetch href={`/page?uid=${link.uid}`} as={href}>
                <a>{children}</a>
            </Link>
        )
    }
    return (
        <a href={href} {...target}>
            {children} ↗
        </a>
    )
}
