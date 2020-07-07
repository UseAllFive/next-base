import '@babel/polyfill'
import 'polyfills/assign'
import 'normalize.css'
import 'nprogress/nprogress.css'
import 'styles/global.css'
import React from 'react'
import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { theme } from 'styles/theme'
import { Metadata } from 'components/metadata'
import * as gtag from 'utils/gtag'
import { getMetadata } from '../utils/metadata'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (url) => {
    gtag.pageView(url)
    NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx: context }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(context)
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps, router } = this.props

        // Determine Metadata
        const { metaTitle, metaDescription, metaKeywords, metaImage } = getMetadata(pageProps)

        return (
            <>
                {/* Should handle metadata for all pages w/ sensible defaults */}
                <Metadata title={metaTitle} description={metaDescription} keywords={metaKeywords} image={metaImage} />
                <ThemeProvider theme={theme}>
                    <main id="ada-content-begin">
                        <AnimatePresence exitBeforeEnter>
                            <Component {...pageProps} key={router.asPath} />
                        </AnimatePresence>
                    </main>
                </ThemeProvider>
            </>
        )
    }
}

// Will be called once for every metric that has to be reported.
// eslint-disable-next-line no-unused-vars
export function reportWebVitals(metric) {
    // These metrics can be sent to any analytics service
    // console.log(metric)
}
