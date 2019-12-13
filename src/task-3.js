import { getJSON } from "./task-1.js";


export default function getSeries(url1, url2) {
    return Promise.all([
        getJSON(url1).catch(() => Promise.reject(new Error('First fetch failed'))),
        getJSON(url2).catch(() => Promise.reject(new Error('Second fetch failed')))
    ])
}
