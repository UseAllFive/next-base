import { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Box, Heading, Text } from 'rebass/styled-components'
import { MotionBox } from '../components/motion-box'
// import Prismic from 'prismic-javascript'
// import { query } from '../utils/prismic'
import Modal from '../components/modal/_modal'

const Page = ({ data = {} }) => {
    const { results } = data
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, stiffness: 100, ease: 'easeInOut' }}>
            <Link href="/page?uid=home" as="/">
                <Box as="a" href="/">
                    Home
                </Box>
            </Link>
            <Link href="/page?uid=about" as="/about">
                <Box as="a" href="/about">
                    About
                </Box>
            </Link>
            <Heading>ADA MODAL</Heading>

            <Box
                as="button"
                onClick={() => {
                    setIsModalOpen(true)
                }}>
                OPEN MODAL
            </Box>
            <Box sx={{ backgroundColor: 'green', mt: '40px', height: '100vh', width: '100%' }} />

            <Modal
                open={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                }}>
                <Box
                    as="button"
                    onClick={() => {
                        setIsModalOpen(false)
                    }}>
                    CLOSE
                </Box>
                <Box sx={{ bg: 'white', p: '40px', textAlign: 'center' }}>THIS IS A MODAL</Box>
            </Modal>
        </MotionBox>
    )
}

// Page.getInitialProps = async (ctx) => {
//     const { uid = 'home' } = ctx.query
//     // Replace with your query
//     const data = await query({
//         predicates: Prismic.Predicates.at('my.page.uid', uid),
//         context: ctx,
//     })

//     return { data }
// }

Page.propTypes = {
    data: PropTypes.object,
}

export default Page
