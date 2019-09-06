import '@babel/polyfill'
import '../polyfills/assign'
import 'normalize.css'
import 'nprogress/nprogress.css'
import '../styles/global.css'
import React from 'react'
import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import { ThemeProvider } from 'styled-components'
import t from 'typy'
import { theme } from '../styles/theme'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Metadata } from '../components/metadata'

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => {
    NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx: context }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(context)
        }

        if (!pageProps.pageData) {
            // eslint-disable-next-line no-param-reassign
            context.res.statusCode = 404
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props

        // Get metadata information
        let metaDescription
        let metaTitle
        let metaImage
        let metaImageURL
        if (t(pageProps, 'pageData.data').safeObject) {
            const { pageData } = pageProps
            const { data } = pageData
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
                    <>
                        <Header />
                        <main id="ada-content-begin">
                            <Component {...pageProps} />
                        </main>
                        <Footer />
                    </>
                </ThemeProvider>
            </>
        )
    }
}
