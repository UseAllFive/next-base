// Convinient methods for handling pageviews and events in Google Analytics
// Make sure that you have edited the GA_TRACKING_ID in order to test this
// Also note that you will not be able to test this unless the env is prod (see pages/_document.js)

import { GA_TRACKING_ID } from '../constants/analytics'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url) => {
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
