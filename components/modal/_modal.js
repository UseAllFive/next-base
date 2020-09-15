import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'rebass/styled-components'
import FocusTrap from 'focus-trap-react'

const Modal = ({ open, onClose, bgStyles, modalStyles, children }) => {
    const closeModal = () => {
        if (onClose) {
            onClose()
        }
    }

    const handleScreenLock = (modalIsOpen) => {
        const { body } = document

        // TODO inline styles
        if (modalIsOpen) {
            body.classList.add('disable-scroll')
        } else {
            body.classList.remove('disable-scroll')
        }
    }

    const _onKeydown = (event) => {
        // TODO keycode deprecated
        switch (event.keyCode) {
            case 27:
                // Escape key
                closeModal()
                break
            default:
                break
        }
    }

    useEffect(() => {
        // When the modal is open listen to keyboard events & lock body scroll
        if (open) {
            handleScreenLock(true)
            document.addEventListener('keydown', _onKeydown, false)
        } else {
            handleScreenLock(false)
            document.removeEventListener('keydown', _onKeydown, false)
        }

        return () => {
            handleScreenLock(false)
            document.removeEventListener('keydown', _onKeydown, false)
        }
    }, [open])

    // TODO add motionbox to fade in
    return (
        <>
            {open && (
                <FocusTrap>
                    <Flex
                        role="dialog"
                        aria-modal="true"
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100vw',
                            height: '100vh',
                            zIndex: '99999999',
                        }}>
                        <Box
                            onClick={closeModal}
                            sx={{
                                display: 'block',
                                background: 'rgba(0, 0, 0, 0.4)',
                                position: 'fixed',
                                top: '0',
                                left: '0',
                                height: '100%',
                                width: '100%',
                                zIndex: '99999999',
                                ...bgStyles,
                            }}
                        />
                        <Box
                            sx={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 99999999,
                                ...modalStyles,
                            }}>
                            {children}
                        </Box>
                    </Flex>
                </FocusTrap>
            )}
        </>
    )
}

Modal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    bgStyles: PropTypes.object,
    modalStyles: PropTypes.object,
    children: PropTypes.node,
}

export default Modal
