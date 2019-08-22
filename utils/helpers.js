function toParamsString(params) {
    const queryString = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')
    return queryString
}

const pxtorem = (px) => `${px / 16}rem`

const sliceSpacing = [2, 3, 4, 5, 6]

module.exports = {
    toParamsString,
    pxtorem,
    sliceSpacing,
}
