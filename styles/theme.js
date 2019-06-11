const colors = {
    black: '#000',
    white: '#FFF',
    gray: '#979797',
    blue: ['#DAEBFE', '#2774AE', '#005587'],
    yellow: '#FFD100',
    red: 'F00',
}

const theme = {
    breakpoints: ['40em', '52em', '64em', '75em', '87em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 55, 64],
    space: [0, 4, 8, 20, 30, 54, 73, 128, 194, 256],
    fonts: {
        regularItalic: 'karbon-regular-italic',
        medium: 'karbon-medium',
        mediumItalic: 'karbon-medium-italic',
        semibold: 'karbon-semibold',
        boldItalic: 'karbon-bold-italic',
    },
    maxWidths: [760, 900, 1100, 1355],
    colors: {
        black: '#000',
        white: '#FFF',
        blue: ['#DAEBFE', '#2774AE', '#005587', '#98BEDA'],
        yellow: '#FFD100',
    },
    buttons: {
        border: {
            border: '1px solid currentColor',
            color: colors.blue[2],
            transition: 'all 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946)',
            '&:hover': {
                color: colors.white,
                background: colors.blue[2],
                border: `1px solid ${colors.blue[2]}`,
            },
        },
        blue: {
            border: `1px solid ${colors.blue[2]}`,
            background: colors.blue[2],
            color: colors.white,
            transition: 'all 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946)',
            '&:hover': {
                color: colors.blue[2],
                background: colors.white,
            },
        },
        white: {
            background: colors.white,
            color: colors.blue[2],
            transition: 'all 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946)',
            '&:hover': {
                color: colors.white,
                background: colors.blue[2],
            },
        },
        yellow: {
            background: colors.yellow,
            color: colors.blue[2],
            transition: 'all 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946)',
            '&:hover': {
                color: colors.yellow,
                background: colors.blue[2],
            },
        },
    },
    letterSpacings: [1.6, 5.56, 7.64],
}

export { theme }
