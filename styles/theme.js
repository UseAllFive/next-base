const pxtorem = (px) => `${px / 16}rem`
const fontSizes = [pxtorem(18), pxtorem(22), pxtorem(30), pxtorem(45), pxtorem(75)]
const letterSpacings = [pxtorem(-1), pxtorem(-0.75), pxtorem(-0.5), pxtorem(-0.25)]

const theme = {
    fontSizes: fontSizes,
    letterSpacings: letterSpacings,
    space: [
        pxtorem(0),
        pxtorem(20),
        pxtorem(40),
        pxtorem(60),
        pxtorem(80),
        pxtorem(100),
        pxtorem(120),
        pxtorem(140),
        pxtorem(160),
        pxtorem(180),
        pxtorem(200),
    ],
    fonts: {
        regular: 'untitled-sans',
        medium: 'untitled-sans-medium',
    },
    colors: {
        black: ['#191919', '#000'],
        gray: ['#EDEDED', '#666'],
        white: '#FFF',
        green: '#00FF86',
        red: '#FF553B',
    },
    sizes: [1284],
    textStyles: {
        h1: {
            fontSize: fontSizes[4],
            letterSpacing: letterSpacings[2],
            lineHeight: 1.1066666667,
        },
        h2: {
            fontSize: fontSizes[3],
            letterSpacing: letterSpacings[2],
            lineHeight: 1.3111111111,
        },
        body: {
            fontSize: fontSizes[2],
            letterSpacing: letterSpacings[2],
            lineHeight: 1.5,
        },
        bodySmall: {
            fontSize: fontSizes[0],
            letterSpacing: letterSpacings[3],
        },
        subheadline: {
            fontSize: fontSizes[1],
            letterSpacing: letterSpacings[3],
        },
    },
}

export { theme }
