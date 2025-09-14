/**
 * Composable para procesar markdown inline usando Nuxt Content
 */
export const useMarkdown = () => {
  /**
   * Procesa markdown inline simple (**bold**, *italic*, etc.)
   * @param {string} text - Texto con markdown
   * @returns {string} HTML procesado
   */
  const parseInline = (text) => {
    if (!text) return ''

    return text
      // **bold** -> <strong class="font-bold text-primary">bold</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>')
      // *italic* -> <em class="italic">italic</em>
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // [link](url) -> <a href="url" class="text-primary hover:underline">link</a>
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
  }

  /**
   * Crea un objeto compatible con ContentRenderer para markdown inline
   * @param {string} text - Texto con markdown
   * @returns {Object} Objeto compatible con Nuxt Content
   */
  const createInlineContent = (text) => {
    return {
      _type: 'markdown',
      body: parseInline(text)
    }
  }

  return {
    parseInline,
    createInlineContent
  }
}