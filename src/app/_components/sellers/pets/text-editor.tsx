import React, { useRef, useMemo, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { IJoditEditorProps } from 'jodit-react';

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface CustomUploaderConfig {
    uploader?: {
        insertImageAsBase64URI?: boolean;
        imagesExtensions?: string[];
    };
}

const Editor = forwardRef<any, { content: string, setContent: (value: string) => void }>(({ content, setContent }, ref) => {
  const config: IJoditEditorProps['config'] & CustomUploaderConfig = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
      },
      buttons: [
        'bold', 
        'italic',
        'underline',
        '|',
        'ul', 'ol',
        '|',
        'outdent', 'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        '|',
        'image',
        'link',
        'align',
        'undo', 'redo',
        '|',
        'hr',
        'eraser',
        'fullsize'
      ],
      toolbar: true 
    }),
    []
  );

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <JoditEditor
      ref={ref}
      value={content}
      config={config}
      onChange={handleChange}
      className="w-full h-[70%] mt-4 bg-white"
    />
  );
});

Editor.displayName = 'Editor';

export default Editor;