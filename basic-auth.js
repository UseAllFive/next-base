const auth = require('basic-auth')

// You can pass multiple users if you need to,
// store them as a keyed values in the users var
const users = {}
const username = process.env.USERNAME || 'demo'
users[username] = { password: process.env.PASSWORD || 'password' }

module.exports = (request, response, next) => {
    const user = auth(request)
    if (!user || !users[user.name] || users[user.name].password !== user.pass) {
        response.set('WWW-Authenticate', 'Basic realm="Staging Site"')
        return response.status(401).send()
    }
    return next()
}
