// Updates the metadata of the page on route change
// Make sure you have defined sensible DEFAULT_METADATA

import Head from 'next/head'
import PropTypes from 'prop-types'
import { DEFAULT_METADATA } from '../constants/metadata'

const Metadata = ({ title, description, keywords, image }) => {
    const metaTitle = title || DEFAULT_METADATA.title
    const metaDescription = description || DEFAULT_METADATA.description
    const metaKeywords = keywords || DEFAULT_METADATA.keywords
    const metaImage = image || DEFAULT_METADATA.image
    return (
        <Head>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            {/* Facebook */}
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Head>
    )
}

Metadata.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    image: PropTypes.string,
}

export { Metadata }
