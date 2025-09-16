/**
 * Composable to handle asset URLs with proper base URL support for GitHub Pages
 */
export const useAssetUrl = () => {
  const nuxtApp = useNuxtApp()

  /**
   * Resolve asset URL with base URL for GitHub Pages deployment
   * @param path - The asset path (e.g., '/images/logo.png')
   * @returns The full asset URL with base path applied
   */
  const resolveAssetUrl = (path: string): string => {
    if (!path) return ''

    // If it's already a full URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    // If it's a relative path (doesn't start with /), return as-is
    if (!path.startsWith('/')) {
      return path
    }

    // Use Nuxt's base URL for absolute paths
    const baseURL = nuxtApp.$config.app?.baseURL || '/'

    // Remove leading slash from path if baseURL already ends with slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const cleanBaseURL = baseURL.endsWith('/') ? baseURL : baseURL + '/'

    return cleanBaseURL + cleanPath
  }

  /**
   * Process image object to resolve all image URLs
   * @param image - Image object that may contain desktop, mobile, src properties
   * @returns Processed image object with resolved URLs
   */
  const resolveImageUrls = (image: string | Record<string, string> | null): string | Record<string, string> | null => {
    if (!image) return image

    // If it's just a string path
    if (typeof image === 'string') {
      return resolveAssetUrl(image)
    }

    // If it's an object with multiple image properties
    const processed: Record<string, string> = { ...image as Record<string, string> }

    if (processed.desktop) processed.desktop = resolveAssetUrl(processed.desktop)
    if (processed.mobile) processed.mobile = resolveAssetUrl(processed.mobile)
    if (processed.src) processed.src = resolveAssetUrl(processed.src)

    return processed
  }

  return {
    resolveAssetUrl,
    resolveImageUrls
  }
}
