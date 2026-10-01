export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const pathname = url.pathname

  const redirects: Record<string, string> = {
    '/index.html': '/',
    '/explore.html': '/explore',
    '/experiences.html': '/experiences',
    '/guides.html': '/guides',
    '/trip.html': '/trip',
    '/place.html': '/explore',
    '/guide.html': '/guides',
    '/request.html': '/guides',
    '/planner': '/trip',
    '/planner.html': '/trip'
  }

  if (redirects[pathname]) {
    return sendRedirect(event, redirects[pathname] + (url.search || '') + (url.hash || ''), 301)
  }

  // Handle generic .html
  if (pathname.endsWith('.html') && pathname !== '/') {
    const clean = pathname.replace(/\.html$/, '')
    return sendRedirect(event, clean + (url.search || '') + (url.hash || ''), 301)
  }
})
