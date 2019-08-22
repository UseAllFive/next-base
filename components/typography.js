/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components'
import { Text } from 'rebass/styled-components'

import { themeGet } from '@styled-system/theme-get'

export const TextH1 = (props) => (
    <Text as={props.$as} {...props} fontSize={[2, 3, 4]} lineHeight={1.1066666667} letterSpacing="-0.01213333333em">
        {props.children}
    </Text>
)

export const TextH2 = (props) => (
    <Text
        as={props.$as}
        {...props}
        fontSize={[1, 2, 3]}
        lineHeight={props.lineHeight || 1.3111111111}
        letterSpacing="-0.014em"
    >
        {props.children}
    </Text>
)

export const TextBody = (props) => (
    <Text as={props.$as} {...props} fontSize={[14, 0, 1, 2]} lineHeight={1.5} letterSpacing="-0.01866666667em">
        {props.children}
    </Text>
)

export const TextBodySmall = (props) => (
    <Text
        as={props.$as}
        {...props}
        fontSize={[14, 0]}
        letterSpacing="-0.01111111111em"
        lineHeight={props.lineHeight || 1.6666666667}
    >
        {props.children}
    </Text>
)

export const TextSubheadline = (props) => (
    <Text as={props.$as} {...props} fontSize={[0, 1]} letterSpacing="-0.01272727273em">
        {props.children}
    </Text>
)

export const TextBullet = styled(TextSubheadline)`
    font-family: ${themeGet('fonts.medium')};
    text-transform: uppercase;

    &:before {
        content: '';
        display: inline-block;
        width: 11px;
        height: 11px;
        position: relative;
        top: -3px;
        background-color: ${themeGet('colors.red')};
        margin-right: 10px;
    }
`

export const StyleH1 = css`
    font-size: ${themeGet('fontSizes.2')}px;
    line-height: 1.5;
    letter-spacing: -0.01213333333em;

    @media screen and (min-width: ${themeGet('breakpoints.0')}) {
        font-size: ${themeGet('fontSizes.3')}px;
    }

    @media screen and (min-width: ${themeGet('breakpoints.1')}) {
        font-size: ${themeGet('fontSizes.4')}px;
    }
`

export const StyleH2 = css`
    font-size: ${themeGet('fontSizes.0')}px;
    line-height: 1.3111111111;
    letter-spacing: -0.014em;

    @media screen and (min-width: ${themeGet('breakpoints.0')}) {
        font-size: ${themeGet('fontSizes.1')}px;
    }

    @media screen and (min-width: ${themeGet('breakpoints.1')}) {
        font-size: ${themeGet('fontSizes.2')}px;
    }

    @media screen and (min-width: ${themeGet('breakpoints.2')}) {
        font-size: ${themeGet('fontSizes.3')}px;
    }
`

export const StyleBody = css`
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: -0.01866666667em;

    @media screen and (min-width: ${themeGet('breakpoints.0')}) {
        font-size: ${themeGet('fontSizes.0')}px;
    }

    @media screen and (min-width: ${themeGet('breakpoints.1')}) {
        font-size: ${themeGet('fontSizes.1')}px;
    }

    @media screen and (min-width: ${themeGet('breakpoints.2')}) {
        font-size: ${themeGet('fontSizes.2')}px;
    }
`

export const StyleBodySmall = css`
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: -0.01111111111em;

    @media screen and (min-width: ${themeGet('breakpoints.0')}) {
        font-size: ${themeGet('fontSizes.0')}px;
    }
`

export const StyleUl = css`
    margin: 0;
    padding-left: 0.8em;

    &:not(:first-child) {
        margin-top: 0.8em;
    }

    & > li {
        position: relative;
        letter-spacing: -0.0125em;
        line-height: 1.667;
        list-style: none;

        &:not(:first-child) {
            margin-top: 0.8em;
        }

        :before {
            content: '';
            position: absolute;
            display: block;
            top: 0.8em;
            left: -0.8em;
            width: 0.5em;
            height: 1px;
            background-color: ${themeGet('colors.gray.1')};
        }
    }
`
