import { useRef, MutableRefObject, useLayoutEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import { EditorType } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const useEditor = ({
  content,
  update,
}: {
  content: string;
  update: Function;
}) => {
  const editorRef = useRef() as MutableRefObject<Editor>;

  useLayoutEffect(() => {
    if (editorRef.current.getInstance().isMarkdownMode()) {
      editorRef.current.getInstance().setMarkdown(content);
    } else {
      editorRef.current.getInstance().setHTML(content);
    }
  }, [content]);

  const editorChangeHandler = (eventType: EditorType) => {
    if (!editorRef.current) {
      return;
    }
    update(
      eventType === "markdown"
        ? editorRef.current.getInstance().getMarkdown()
        : editorRef.current.getInstance().getHTML()
    );
  };

  const renderEditor = () => (
    <Editor
      previewStyle="vertical"
      ref={editorRef}
      onChange={editorChangeHandler}
    />
  );
  return { renderEditor };
};

export default useEditor;
