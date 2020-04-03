import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { PRISMIC_API_URL } from '../constants/prismic'
import { GA_TRACKING_ID } from '../constants/analytics'

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
        return (
            <html lang="en">
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="robots" content="noindex, nofollow" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/assets/images/icons-192.png" />
                    <meta name="theme-color" content="#000000" />
                    {/* eslint-disable-next-line react/no-danger */}
                    <script dangerouslySetInnerHTML={this.setPrismic()} />
                    <script type="text/javascript" src="//static.cdn.prismic.io/prismic.min.js" />
                    {/* Start Google Analytics */}
                    {process.env.NODE_ENV === 'production' && (
                        <>
                            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                            <script
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());
                                        gtag('config', '${GA_TRACKING_ID}');
                                    `,
                                }}
                            />
                        </>
                    )}
                    {/* End Google Analytics */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
