/*
  All pages on the site should have default metadata, and then allow overrides in the CMS
  Default metadata is handled in /constants/metadata.js
*/

import t from 'typy'
import { DEFAULT_METADATA } from '../constants/metadata'

const getMetadataOverrides = (data) => {
    // Check if there are CMS overrides
    // Metadata overrides are set via Prismic fields: meta_title, meta_description, meta_keywords, meta_image
    // The naming of these properties must match the above
    const { meta_title: title, meta_description: description, meta_keywords: keywords, meta_image: metaImage } = data
    const image = t(metaImage, 'url').safeObject
    return { title, description, keywords, image }
}

const getMetadata = (pageProps) => {
    let metaTitle
    let metaDescription
    let metaKeywords
    let metaImage

    const defaults = {
        metaTitle: DEFAULT_METADATA.suffix,
        metaDescription: DEFAULT_METADATA.description,
        metaKeywords: DEFAULT_METADATA.keywords,
        metaImage: DEFAULT_METADATA.image,
    }

    if (!pageProps) {
        return defaults
    }

    // Determine metadata based on Content Type and CMS Overrides
    // Each page type can have it's own rules for default metadata
    if (t(pageProps, 'pageData.data').safeObject) {
        const { title, description, keywords, image } = getMetadataOverrides(pageProps.pageData.data)

        metaTitle = title ? `${title} ${DEFAULT_METADATA.divider} ${DEFAULT_METADATA.suffix}` : defaults.metaTitle
        metaDescription = description || defaults.metaDescription
        metaKeywords = keywords || defaults.metaKeywords
        metaImage = image || defaults.metaImage
    } else {
        metaTitle = defaults.metaTitle
        metaDescription = defaults.metaDescription
        metaKeywords = defaults.metaKeywords
        metaImage = defaults.metaImage
    }

    return { metaTitle, metaDescription, metaKeywords, metaImage }
}

export { getMetadata }
