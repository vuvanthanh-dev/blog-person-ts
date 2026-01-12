import React from "react";
import { sanitizeHtml } from "@/core/utils/sanitize";

/**
 * SafeHtml Component - Safely renders HTML content
 *
 * This component automatically sanitizes HTML content using DOMPurify
 * to prevent XSS attacks. Use this when displaying user-generated HTML
 * content from rich text editors, markdown, or any untrusted source.
 *
 * Usage:
 * ```tsx
 * import SafeHtml from '@/core/components/safe-html';
 *
 * // Display post content from editor
 * <SafeHtml content={post.content} />
 *
 * // With custom className
 * <SafeHtml content={post.content} className="post-content" />
 * ```
 */
interface SafeHtmlProps {
  /** HTML content to be sanitized and rendered */
  content: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Tag to use for wrapper element (default: div) */
  as?: keyof JSX.IntrinsicElements;
}

const SafeHtml: React.FC<SafeHtmlProps> = ({
  content,
  className = "",
  style = {},
  as: Tag = "div",
}) => {
  // Sanitize content before rendering
  const cleanHtml = sanitizeHtml(content);

  return (
    <Tag
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

export default SafeHtml;
