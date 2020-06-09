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
import t from 'typy'
import { AnimatePresence } from 'framer-motion'
import { theme } from 'styles/theme'
import { Metadata } from 'components/metadata'
import * as gtag from 'utils/gtag'

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

        // Get metadata information
        let metaDescription
        let metaTitle
        let metaImage
        let metaImageURL
        if (t(pageProps, 'data.data').safeObject) {
            const { pageData } = pageProps
            const { data } = pageData
            // Important: note that this is expecting properties on your Prismic page object for metadata:
            // meta_title, meta_description, and meta_image
            // The naming of these properties must match the above
            // Also note the fallbacks for title, description and image
            // Feel free to edit these to work with your naming conventions etc
            ;({ meta_image: metaImage, meta_description: metaDescription, meta_title: metaTitle } = data)
            metaImageURL = t(metaImage, 'url').safeObject
            if (!metaTitle) metaTitle = data.title
            if (!metaDescription) metaDescription = data.excerpt
            if (!metaImageURL) metaImageURL = t(data, 'image.url').safeObject
        }

        return (
            <>
                {/* Should handle metadata for all pages w/ sensible defaults */}
                <Metadata title={metaTitle} description={metaDescription} image={metaImageURL} />
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
