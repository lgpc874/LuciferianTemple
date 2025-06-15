import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Digite o conteúdo...",
  className = "",
  height = "300px"
}: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  // Configuração completa da toolbar estilo Word
  const modules = {
    toolbar: {
      container: [
        // Formatação de texto
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        
        // Formatação básica
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        
        // Alinhamento e indentação
        [{ 'align': [] }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        
        // Listas
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        
        // Scripts e formatação especial
        [{ 'script': 'sub'}, { 'script': 'super' }],
        
        // Links e mídia
        ['link', 'image', 'video'],
        
        // Blocos especiais
        ['blockquote', 'code-block'],
        
        // Limpeza e ações
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  // Formatos suportados
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 
    'color', 'background',
    'align', 'indent',
    'list', 'bullet',
    'script',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

  // Aplicar estilos customizados ao editor
  useEffect(() => {
    const editor = document.querySelector('.ql-editor');
    if (editor) {
      (editor as HTMLElement).style.minHeight = height;
      (editor as HTMLElement).style.fontFamily = 'Garamond, Georgia, serif';
      (editor as HTMLElement).style.fontSize = '16px';
      (editor as HTMLElement).style.lineHeight = '1.6';
    }
  }, [height]);

  return (
    <div className={`rich-text-editor ${className}`}>
      <style>{`
        .rich-text-editor .ql-toolbar {
          border: 1px solid #d4af37;
          border-radius: 8px 8px 0 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
        }
        
        .rich-text-editor .ql-container {
          border: 1px solid #d4af37;
          border-top: none;
          border-radius: 0 0 8px 8px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
        }
        
        .rich-text-editor .ql-editor {
          color: #f5f5dc;
          caret-color: #d4af37;
        }
        
        .rich-text-editor .ql-editor::before {
          color: #d4af37;
          opacity: 0.7;
        }
        
        .rich-text-editor .ql-toolbar .ql-formats {
          margin-right: 15px;
        }
        
        .rich-text-editor .ql-toolbar button {
          color: #d4af37;
          border: none;
          border-radius: 4px;
          padding: 4px;
          margin: 1px;
        }
        
        .rich-text-editor .ql-toolbar button:hover {
          background: rgba(212, 175, 55, 0.2);
          color: #f5f5dc;
        }
        
        .rich-text-editor .ql-toolbar button.ql-active {
          background: rgba(212, 175, 55, 0.3);
          color: #f5f5dc;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker {
          color: #d4af37;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker-options {
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid #d4af37;
          border-radius: 4px;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker-item {
          color: #f5f5dc;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker-item:hover {
          background: rgba(212, 175, 55, 0.2);
        }
        
        .rich-text-editor .ql-snow .ql-stroke {
          stroke: #d4af37;
        }
        
        .rich-text-editor .ql-snow .ql-fill {
          fill: #d4af37;
        }
        
        .rich-text-editor .ql-editor h1, 
        .rich-text-editor .ql-editor h2, 
        .rich-text-editor .ql-editor h3,
        .rich-text-editor .ql-editor h4,
        .rich-text-editor .ql-editor h5,
        .rich-text-editor .ql-editor h6 {
          color: #d4af37;
          font-family: 'Cinzel', serif;
          margin: 1em 0 0.5em 0;
        }
        
        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid #d4af37;
          background: rgba(212, 175, 55, 0.1);
          padding: 10px 15px;
          margin: 15px 0;
          font-style: italic;
        }
        
        .rich-text-editor .ql-editor code {
          background: rgba(212, 175, 55, 0.2);
          color: #f5f5dc;
          padding: 2px 4px;
          border-radius: 3px;
        }
        
        .rich-text-editor .ql-editor .ql-code-block-container {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #d4af37;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .rich-text-editor .ql-editor ol,
        .rich-text-editor .ql-editor ul {
          padding-left: 1.5em;
        }
        
        .rich-text-editor .ql-editor li {
          margin: 0.25em 0;
        }
        
        .rich-text-editor .ql-editor a {
          color: #d4af37;
          text-decoration: underline;
        }
        
        .rich-text-editor .ql-editor a:hover {
          color: #f5f5dc;
        }
      `}</style>
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{
          minHeight: height,
        }}
      />
    </div>
  );
}