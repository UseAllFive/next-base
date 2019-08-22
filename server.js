const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 5000
const Cookies = require('cookies')
const Prismic = require('prismic-javascript')
const { parse } = require('url')
const compression = require('compression')
const { linkResolver } = require('./utils/link-resolver')
const { PRISMIC_API_URL } = require('./config')

// Force https
const requireHTTPS = (req, res, _next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && !dev) {
        return res.redirect(301, `https://${req.get('host')}${req.url}`)
    }
    _next()
}

app.prepare()
    .then(() => {
        const server = express()
        server.use([compression(), requireHTTPS])

        server.get('/preview', async (req, res) => {
            const { token } = req.query
            const api = await Prismic.getApi(PRISMIC_API_URL, {
                req,
                accessToken: process.env.PRISMIC_ACCESS_TOKEN,
            })
            const url = await api.previewSession(token, linkResolver, '/')
            const cookies = new Cookies(req, res)
            cookies.set(Prismic.previewCookie, token, {
                maxAge: 30 * 60 * 1000,
                path: '/',
                httpOnly: false,
            })
            res.redirect(302, url)
        })

        // Sitemap
        server.get('/sitemap.xml', (req, res) =>
            res.status(200).sendFile('sitemap.xml', { root: `${__dirname}/static` })
        )

        // Favicon stuff
        server.get('/favicon.ico', (req, res) =>
            res.status(200).sendFile('favicon.ico', { root: `${__dirname}/static/favicons` })
        )

        server.get('/site.webmanifest', (req, res) =>
            res.status(200).sendFile('site.webmanifest', { root: `${__dirname}/static/favicons/` })
        )

        server.get('/browserconfig.xml', (req, res) =>
            res.status(200).sendFile('browserconfig.xml', {
                root: `${__dirname}/static/favicons/`,
            })
        )

        server.get('/work/:slug', (req, res) => {
            app.render(req, res, '/work-detail', { slug: req.params.slug })
        })

        server.get('*', async (req, res) => {
            const parsedUrl = parse(req.url, true)
            const { pathname } = parsedUrl
            // Match all paths that start with /_next/
            const nextFilesRegex = RegExp('^/_next')
            const staticFilesRegex = RegExp('^/static')
            // Handle all internal links the default way and all other links as pages
            if (nextFilesRegex.test(pathname) || staticFilesRegex.test(pathname)) {
                return handle(req, res)
            }
            const nextJsPage = '/page'
            // Remove first blank in array
            const paths = pathname.split('/').slice(1)
            // Use undefined if not path, otherwise use last path in array
            const lastPath = paths[0].length === 0 ? undefined : paths[paths.length - 1]
            app.render(req, res, nextJsPage, { uid: lastPath })
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
        })
    })
    .catch((ex) => {
        // eslint-disable-next-line no-console
        console.error(ex.stack)
        process.exit(1)
    })
