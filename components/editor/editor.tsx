"use client";

import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  InsertCodeBlock,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  ListsToggle,
  linkDialogPlugin,
  CreateLink,
  InsertImage,
  InsertTable,
  tablePlugin,
  imagePlugin,
  codeMirrorPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  Separator,
  InsertThematicBreak,
  diffSourcePlugin,
  MDXEditorMethods,
  thematicBreakPlugin,
  BlockTypeSelect,
  CodeToggle,
} from "@mdxeditor/editor";
import { basicDark } from "cm6-theme-basic-dark";
import { Ref } from "react";
import { FC, useEffect, useState } from "react";
import "@mdxeditor/editor/style.css";
import "./dark.editor.css";
import "./light.editor.css";
import { useTheme } from "next-themes";
import ThemeToggle from "./theme-toggle";

interface Props {
  value: string;
  editorRef: Ref<MDXEditorMethods> | null;
  fieldChange: (value: string) => void;
}

const Editor: FC<Props> = ({ editorRef, value, fieldChange }) => {
  const { resolvedTheme } = useTheme();
  const [editorTheme, setEditorTheme] = useState(resolvedTheme);
  const theme = editorTheme === "dark" ? [basicDark] : [];

  // Handle editor theme change
  const handleThemeChange = (isDark: boolean) => {
    setEditorTheme(isDark ? "dark" : "light");
  }; // Load saved theme preference on initial render
  useEffect(() => {
    const storedTheme = localStorage.getItem("editor-theme");
    if (storedTheme) {
      setEditorTheme(storedTheme);
    } else if (resolvedTheme) {
      // If no stored preference, use system theme
      setEditorTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  // --- vvv التعديل هنا vvv ---
  // استخدام useEffect لإضافة تعريفات CSS على مستوى المستند
  useEffect(() => {
    // إنشاء عنصر style لتعريفات الـ CSS
    const style = document.createElement("style");
    style.textContent = `
      .mdxeditor-popup-container {
        position: fixed !important;
        z-index: 9999 !important;
      }
      [role="tooltip"], 
      [role="dialog"] {
        position: fixed !important;
        z-index: 9999 !important;
      }
      
      /* تحسينات لاختيار لغة البرمجة */
      .mdxeditor [role="combobox"][aria-label="Select language"] {
        min-width: 150px;
        max-width: 100%;
        background-color: ${editorTheme === "dark" ? "#2a2d35" : "#f5f5f5"};
        border-radius: 4px;
        padding: 4px 8px;
      }
      
      /* هنا يتم تصغير القائمة وإضافة السكرول */
      .mdxeditor [role="listbox"] {
        max-height: 250px; /* تحديد أقصى ارتفاع للقائمة */
        overflow-y: auto;   /* إضافة شريط تمرير عمودي عند الحاجة */
        scrollbar-width: thin; /* لتنسيق شكل السكرول في بعض المتصفحات */
        z-index: 9999 !important;
      }      /* تحسين مظهر مربعات الكود */
      .mdxeditor pre {
        border-radius: 6px;
        margin: 12px 0;
      }
      
      /* تنسيق لون النص حسب الثيم */
      .light-editor .mdxeditor {
        color: #000000 !important;
      }
      
      .light-editor .mdxeditor .mdxeditor-rich-text-editor {
        color: #000000 !important;
      }
      
      .light-editor .mdxeditor .mdxeditor-rich-text-editor p,
      .light-editor .mdxeditor .mdxeditor-rich-text-editor h1,
      .light-editor .mdxeditor .mdxeditor-rich-text-editor h2,
      .light-editor .mdxeditor .mdxeditor-rich-text-editor h3,
      .light-editor .mdxeditor .mdxeditor-rich-text-editor h4,
      .light-editor .mdxeditor .mdxeditor-rich-text-editor h5,
      .light-editor .mdxeditor .mdxeditor-rich-text-editor h6,
      .light-editor .mdxeditor .mdxeditor-rich-text-editor li,
      .light-editor .mdxeditor .mdxeditor-rich-text-editor span,
      .light-editor .mdxeditor .mdxeditor-rich-text-editor div {
        color: #000000 !important;
      }
      
      /* تنسيق لون النص في التولبار */
      .light-toolbar button,
      .light-toolbar span,
      .light-toolbar [role="combobox"] {
        color: #000000 !important;
      }
      
      /* تحسينات اختيار اللغة على الهواتف المحمولة */
      @media (max-width: 640px) {
        .mdxeditor [role="combobox"][aria-label="Select language"] {
          font-size: 14px;
        }
        
        .mdxeditor [role="listbox"] {
          max-width: 90vw;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [editorTheme]); // --- ^^^ نهاية التعديل ^^^ ---

  return (
    <div className="editor-container relative z-[60] w-full gap-3 h-full">
      {/* محرر MDX مع دعم العناوين والتنسيق المتقدم */}{" "}
      <MDXEditor
        key={editorTheme}
        markdown={value}
        ref={editorRef}
        onChange={fieldChange}
        className={`grid background-light800_dark200 light-border-2 markdown-editor ${editorTheme === "dark" ? "dark-editor" : "light-editor"} border rounded-xl transition-colors duration-300`}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          imagePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              // Common web languages
              html: "HTML",
              css: "CSS",
              js: "JavaScript",
              jsx: "JavaScript (React)",
              ts: "TypeScript",
              tsx: "TypeScript (React)",

              // Backend languages
              python: "Python",
              java: "Java",
              cpp: "C++",
              c: "C",
              go: "Go",

              // Plain text
              txt: "Plain Text",
              "": "Unspecified",
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: theme,
          }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
          toolbarPlugin({
            toolbarClassName: `flex flex-wrap items-center my-classname ${editorTheme === "dark" ? "dark-toolbar" : "light-toolbar"} light-border-2 rounded-lg transition-colors duration-300`,
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />
                        <Separator />
                        {/* محدد نوع العنوان H1-H6 */}
                        <BlockTypeSelect />
                        <Separator />
                        <ListsToggle />
                        <Separator />
                        <CreateLink />
                        <InsertImage />
                        <Separator /> <InsertTable />
                        <InsertThematicBreak /> <InsertCodeBlock />
                        <div className="ml-2">
                          <ThemeToggle
                            onThemeChange={handleThemeChange}
                            initialTheme={resolvedTheme}
                          />
                        </div>
                      </>
                    ),
                  },
                ]}
              />
            ),
          }),
        ]}
      />
    </div>
  );
};

export default Editor;
