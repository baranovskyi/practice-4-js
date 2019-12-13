import { getJSON } from "./task-1.js";

export default function getParallel(urls) {
    return Promise.all(urls.map(getJSON))
     
}
