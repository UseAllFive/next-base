import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { PRISMIC_API_URL } from '../config'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
                ua: ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent,
            }
        } finally {
            sheet.seal()
        }
    }

    setPrismic() {
        return {
            __html: `
            window.prismic = {
              endpoint: '${PRISMIC_API_URL}'
            }
          `,
        }
    }

    render() {
        const { ua } = this.props
        const isIE = /MSIE (\d+\.\d+);/.test(ua) || ua.indexOf('Trident/') > -1
        return (
            <html lang="en">
                <Head>
                    {isIE && ( // IE only, not Edge or others
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" />
                    )}
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    {/* eslint-disable-next-line react/no-danger */}
                    <script dangerouslySetInnerHTML={this.setPrismic()} />
                    <script type="text/javascript" src="//static.cdn.prismic.io/prismic.min.js" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
