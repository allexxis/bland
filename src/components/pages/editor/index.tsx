import { useEffect, useRef, useState, type FC } from 'react';
import { EDITOR_JS_TOOLS } from '@/components/editor/tools';
import EditorJS from '@editorjs/editorjs';

const DEFAULT_INITIAL_DATA = {
   time: new Date().getTime(),
   blocks: [
      {
         type: 'header',
         data: {
            text: 'This is my awesome editor!',
            level: 1,
         },
      },
   ],
};
const Editor: FC = () => {
   const ejInstance = useRef<EditorJS | null>(null);
   useEffect(() => {
      if (ejInstance.current === null) {
         initEditor();
      }

      return () => {
         if (ejInstance.current && ejInstance.current.destroy) {
            ejInstance.current.destroy();
         }
      };
   }, []);
   const initEditor = () => {
      const editor = new EditorJS({
         holder: 'editorjs',
         onReady: () => {
            ejInstance.current = editor;
            new EDITOR_JS_TOOLS.dragAndDrop(editor);
            new EDITOR_JS_TOOLS.undo(editor);
         },
         tools: EDITOR_JS_TOOLS,
         autofocus: true,
         data: DEFAULT_INITIAL_DATA,
         onChange: async () => {
            let content = await editor.saver.save();
            console.log(content);
         },
      });
   };

   return (
      <div className="mt-10">
         <div id="editorjs"></div>
      </div>
   );
};

export default Editor;
