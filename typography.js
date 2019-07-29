import { Text } from 'rebass'

export const H1Text = (props) => (
    <Text {...props} fontSize={4} letterSpacing={0}>
        {props.children}
    </Text>
)

export const H2Text = (props) => (
    <Text {...props} fontSize={3} letterSpacing={2}>
        {props.children}
    </Text>
)

export const BodyText = (props) => (
    <Text {...props} fontSize={2} letterSpacing={2}>
        {props.children}
    </Text>
)

export const BodySmall = (props) => (
    <Text {...props} fontSize={0} letterSpacing={3}>
        {props.children}
    </Text>
)

export const Subheadline = (props) => (
    <Text {...props} fontSize={1} letterSpacing={3}>
        {props.children}
    </Text>
)
