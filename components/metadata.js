import Head from 'next/head'
import PropTypes from 'prop-types'
import { DEFAULT_METADATA } from '../config'

const Metadata = ({ title, description, image }) => {
    const metaTitle = title
        ? `${title} ${DEFAULT_METADATA.divider} ${DEFAULT_METADATA.suffix}`
        : DEFAULT_METADATA.suffix
    const metaDescription = description || DEFAULT_METADATA.description
    const metaImage = image || DEFAULT_METADATA.image
    return (
        <Head>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            {/* Facebook */}
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@calcharters" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Head>
    )
}

Metadata.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
}

export { Metadata }
