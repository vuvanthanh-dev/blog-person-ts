import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./_editor.module.scss";

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
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  modules?: any;
  formats?: string[];
}

const EditorComponent: React.FC<EditorProps> = (props) => {
  const {
    onChange,
    placeholder,
    value,
    name,
    className = "",
    style = {},
    modules = defaultModules,
    formats = defaultFormats,
  } = props;

  const handleChange = (content: string) => {
    const event = {
      target: {
        name,
        value: content,
      },
      // Mimic React ChangeEvent behavior
      persist: () => {},
      bubbles: true,
      cancelable: true,
      defaultPrevented: false,
      currentTarget: null,
      isDefaultPrevented: () => false,
      isPropagationStopped: () => false,
      nativeEvent: new Event("change"),
      preventDefault: () => {},
      stopPropagation: () => {},
      type: "change",
    } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
    onChange(event);
  };

  return (
    <div className={`${styles.editorWrapper} ${className}`} style={style}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default EditorComponent;
