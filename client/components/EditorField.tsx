import React from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const API_KEY = process.env.NEXT_PUBLIC_TINY;

const EditorField = ({
  initialValue,
  onContentChange,
}: {
  initialValue: string;
  onContentChange: (value: string) => void;
}) => {
  const editorRef = useRef<Editor>(null);

  const handleUpdate = (value: string) => {
    onContentChange?.(value);
  };

  return (
    <Editor
      apiKey={API_KEY}
      ref={editorRef}
      initialValue={initialValue}
      init={{
        height: 600,
        relative_urls: false,
        remove_script_host: false,
        plugins:
          "advcode a11ychecker autocorrect autolink editimage emoticons image inlinecss link linkchecker lists mergetags powerpaste tinymcespellchecker typography",
        toolbar:
          "undo redo | styles | bold italic forecolor | link image emoticons mergetags | align bullist numlist | spellchecker a11ycheck typography | code removeformat",
      }}
      onEditorChange={handleUpdate}
    />
  );
};

export default EditorField;
