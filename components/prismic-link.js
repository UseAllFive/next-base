// Takes a link from Prismic and generates an outbound anchor or an internal Next Link

import PrismicDOM from 'prismic-dom'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { linkResolver } from '../utils/link-resolver'

const PrismicLink = (props) => {
    const { link, children } = props
    const href = PrismicDOM.Link.url(link, linkResolver)
    let target = {}
    if (link.target) {
        target = {
            target: link.target,
            rel: 'noopener',
        }
    }
    if (link.link_type === 'Document') {
        return (
            <Link href={`/page?uid=${link.uid}`} as={href}>
                <a>{children}</a>
            </Link>
        )
    }
    return (
        <a href={href} {...target}>
            {children} ↗&#xFE0E; <span className="ada-hidden">(opens in new window)</span>
        </a>
    )
}

PrismicLink.propTypes = {
    link: PropTypes.shape({
        target: PropTypes.string,
        link_type: PropTypes.string,
        uid: PropTypes.string,
    }),
    children: PropTypes.any,
}

export { PrismicLink }
