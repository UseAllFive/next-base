function toParamsString(params) {
    const queryString = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')
    return queryString
}

module.exports = {
    toParamsString,
}
