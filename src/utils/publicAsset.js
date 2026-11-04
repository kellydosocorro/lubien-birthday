// Builds a URL for a file in /public that works under any deploy base path
// (e.g. GitHub Pages serves the site from /lubien-birthday/).
export const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
