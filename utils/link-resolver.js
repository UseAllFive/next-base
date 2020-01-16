// https://prismic.io/docs/javascript/beyond-the-api/link-resolving

function linkResolver(doc) {
    if (doc.type === 'page') {
        if (doc.uid === 'home') return `/`
        return `/${doc.uid}`
    }
}

module.exports = {
    linkResolver,
}
