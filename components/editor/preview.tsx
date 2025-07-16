import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";

Code.theme ={
    light: "github-light",
    dark: "github-dark",
    lightSelector:"html.light",
}


export const Preview = ({ content }: { content: string }) => {
  const formattedContent = content.replace(/\\/g, "").replace(/&#x20;/g, "");

  return (
<section className="markdown prose max-w-none w-full break-words overflow-hidden 
                        xl:max-w-[calc(100vw-360px280px)] 
                        lg:max-w-[calc(100vw-300px)] 
                        md:max-w-[calc(100vw-80px)]
                        sm:max-w-full">
      <MDXRemote
        source={formattedContent}
        components={{
          pre: (props) => (
            <Code
              {...props}
              lineNumbers
              className="shadow-light-200 dark:shadow-dark-200 max-w-full overflow-x-auto"
            />
          ),
        }}
      />
    </section>
  );
};
