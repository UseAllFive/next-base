// Takes a link from Prismic and generates an outbound anchor or an internal Next Link

import PrismicDOM from 'prismic-dom'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Box } from 'rebass/styled-components'
import { linkResolver } from '../utils/link-resolver'

const PrismicLink = (props) => {
    const { link, children, className } = props
    if (!link) {
        return (
            <Box as="a" className={className} sx={{ ...props.sx }}>
                {children} <span className="ada-hidden">(opens in new window)</span>
            </Box>
        )
    }
    const linkIsString = typeof link === 'string'
    const href = linkIsString ? link : PrismicDOM.Link.url(link, linkResolver)
    let target = {}
    if (linkIsString || link.target) {
        target = {
            target: link.target || '_blank',
            rel: 'noopener',
        }
    }
    if (linkIsString || link.link_type === 'Web') {
        return (
            <Box as="a" className={className} href={href} {...target} sx={{ ...props.sx }}>
                {children} <span className="ada-hidden">(opens in new window)</span>
            </Box>
        )
    }
    return (
        <Link href={`/page?uid=${link.uid}`} as={href} passHref>
            <Box as="a" sx={{ ...props.sx }}>
                {children}
            </Box>
        </Link>
    )
}

PrismicLink.propTypes = {
    className: PropTypes.string,
    link: PropTypes.any,
    children: PropTypes.any,
    sx: PropTypes.any,
}

export { PrismicLink }
