import 'normalize.css'
import 'nprogress/nprogress.css'
import '../styles/global.css'
import App, { Container } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import t from 'typy'
import { Metadata } from '../components/metadata'
import * as gtag from '../utils/gtag'

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (url) => {
    NProgress.done()
    gtag.pageview(url)
})
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props

        // Get metadata information
        let meta_description, meta_title, meta_image, meta_image_url
        if (t(pageProps, 'pageData.data').safeObject) {
            const { pageData } = pageProps
            const { data } = pageData
            ;({ meta_image, meta_description, meta_title } = data)
            meta_image_url = t(meta_image, 'url').safeObject
            // Fall back intelligently if no meta data is defined
            switch (pageData.type) {
                case 'event':
                case 'timeline_node':
                case 'post':
                    if (!meta_title) meta_title = data.title
                    if (!meta_description) meta_description = data.excerpt
                    if (!meta_image_url) meta_image_url = t(data, 'image.url').safeObject
                    break
            }
        }

        return (
            <>
                {/* Should handle metadata for all pages w/ sensible defaults */}
                <Metadata title={meta_title} description={meta_description} image={meta_image_url} />
                <ThemeProvider theme={theme}>
                    <Container>
                        <Header />
                        <div id="ada-content-begin">
                            <Component {...pageProps} />
                        </div>
                        <Footer />
                    </Container>
                </ThemeProvider>
            </>
        )
    }
}
