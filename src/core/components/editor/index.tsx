import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./_editor.module.scss";

/**
 * Rich Text Editor Component using React Quill
 *
 * 🔒 Security Note:
 * - React Quill has built-in XSS protection during editing
 * - However, when DISPLAYING saved content (not in editor), use sanitizeHtml:
 *
 * ```tsx
 * import { sanitizeHtml } from '@/core/utils/sanitize';
 *
 * // DO NOT render raw HTML like this:
 * <div dangerouslySetInnerHTML={{ __html: content }} /> // ❌ UNSAFE
 *
 * // ALWAYS sanitize first:
 * <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} /> // ✅ SAFE
 * ```
 */

const defaultModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"], // hỗ trợ chèn link và hình ảnh
    ["clean"],
  ],
};

const defaultFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "clean",
];

interface EditorProps {
  value: string;
  name: string;
  placeholder?: string;
  onChange: (e: string) => void;
  className?: string;
  style?: React.CSSProperties;
  modules?: any;
  formats?: string[];
  disabled?: boolean;
}

const EditorComponent: React.FC<EditorProps> = (props) => {
  const {
    onChange,
    placeholder,
    value,
    className = "",
    style = {},
    modules = defaultModules,
    formats = defaultFormats,
    disabled = false,
  } = props;

  const customModules = {
    ...modules,
    toolbar: disabled ? [] : modules.toolbar,
  };

  return (
    <div className={`${styles.editorWrapper} ${className}`} style={style}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={customModules}
        formats={formats}
        readOnly={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default EditorComponent;
