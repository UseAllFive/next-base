function linkResolver(doc) {
    if (doc.type === 'home_page') {
        return `/`
    }
    if (doc.type === 'contact') {
        return `/contact`
    }
    if (doc.type === 'work') {
        return `/work/${doc.uid}`
    }
}

module.exports = {
    linkResolver,
}
