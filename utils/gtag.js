export const GA_TRACKING_ID = 'UA-xxxx-x'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    if (process.env.NODE_ENV === 'production') {
        setTimeout(() => {
            window.gtag('config', GA_TRACKING_ID, {
                page_location: url,
            })
        }, 0)
    }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    if (process.env.NODE_ENV === 'production') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value,
        })
    }
}
