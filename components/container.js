/* eslint-disable react/prop-types */
import { Box } from 'rebass/styled-components'
import { layout } from 'styled-system'
import styled from 'styled-components'

export const Container = (props) => (
    <Box as={props.$as || 'section'} px={1} {...props}>
        <Inner maxWidth={props.maxWidth || 0} mx={props.mx || 'auto'}>
            {props.children}
        </Inner>
    </Box>
)

const Inner = styled(Box)`
    ${layout}
`
