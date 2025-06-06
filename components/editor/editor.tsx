"use client";
import type { ForwardedRef } from "react";
import "@mdxeditor/editor/style.css";

import {
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ListsToggle,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CreateLink,
  imagePlugin,
  linkPlugin,
} from "@mdxeditor/editor";
import { FC } from "react";
import { basicDark } from "cm6-theme-basic-dark";
import "./dark.editor.css";
import { useTheme } from "next-themes";
import { Separator } from "@radix-ui/react-separator";
interface EditorProps {
  value: string;
  editorRef: React.MutableRefObject<MDXEditorMethods | null>;
  onChange: (markdown: string) => void;
}

const Editor: FC<EditorProps> = ({ editorRef, value, onChange, ...props }) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? [basicDark] : [];
  function codeBlock(): import("@mdxeditor/editor").RealmPlugin {
    throw new Error("Function not implemented.");
  }

  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      ref={editorRef}
      className="w-full h-full background-light800_dark200 light-border-2 markdown-editor dark-editor border rounded-xl overflow-hidden relative  "
      onChange={onChange}
      plugins={[
        imagePlugin(),
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
            css: "css",
            txt: "txt",
            sql: "sql",
            html: "html",
            saas: "saas",
            scss: "scss",
            bash: "bash",
            json: "json",
            js: "javascript",
            ts: "typescript",
            "": "unspecified",
            tsx: "TypeScript (React)",
            jsx: "JavaScript (React)",
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: theme,
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
        toolbarPlugin({
          toolbarClassName:
            "my-classname mdx-toolbar dark-toolbar light-border-2 rounded-lg mdxeditor-popup-wrapper   ",
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
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />

                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
    />
  );
};

export default Editor;
