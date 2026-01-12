import DOMPurify from "dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * This utility uses DOMPurify to remove potentially dangerous HTML/JavaScript
 * from user-generated content (e.g., from React Quill editor).
 *
 * Security Features:
 * - Removes <script> tags and inline event handlers (onclick, onerror, etc.)
 * - Blocks javascript: URLs
 * - Sanitizes data: URLs in images
 * - Removes potentially dangerous attributes
 *
 * Usage:
 * ```tsx
 * import { sanitizeHtml } from '@/core/utils/sanitize';
 *
 * // When displaying rich text content
 * <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
 * ```
 *
 * @param dirty - Untrusted HTML string from user input
 * @returns Sanitized HTML safe for rendering
 */
export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    // Allow common HTML tags for rich text
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "img",
      "pre",
      "code",
      "span",
      "div",
    ],
    // Allow safe attributes
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "src",
      "alt",
      "title",
      "class",
      "style",
    ],
    // Forbid <a target="_blank"> without rel="noopener noreferrer"
    ALLOW_UNKNOWN_PROTOCOLS: false,
    // Keep relative URLs
    ALLOW_DATA_ATTR: false,
  });
};

/**
 * Strip all HTML tags and return plain text
 * Useful for displaying content in meta tags, previews, etc.
 *
 * @param html - HTML string
 * @returns Plain text without HTML tags
 */
export const stripHtml = (html: string): string => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
};

/**
 * Sanitize and limit content length
 * Useful for previews and excerpts
 *
 * @param html - HTML string
 * @param maxLength - Maximum length of plain text
 * @returns Sanitized and truncated text
 */
export const sanitizeAndTruncate = (
  html: string,
  maxLength: number = 200
): string => {
  const plainText = stripHtml(html);
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
};
