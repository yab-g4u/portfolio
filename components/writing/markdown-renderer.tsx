import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "@/components/writing/code-block"

interface MarkdownRendererProps {
  content: string
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function getNodeText(node: any): string {
  if (!node) return ""
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (node.props && node.props.children) return getNodeText(node.props.children)
  return ""
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-content max-w-none text-foreground/90 font-sans text-[15px] sm:text-[16px] leading-[1.75]">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-8 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => {
            const raw = getNodeText(children)
            const id = slugifyHeading(raw)
            return (
              <h2
                id={id}
                className="group relative text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-10 mb-3 pt-4 border-t border-border/40 scroll-mt-24"
              >
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <span>{children}</span>
                  <span className="opacity-0 group-hover:opacity-60 text-muted-foreground text-sm font-mono transition-opacity">
                    #
                  </span>
                </a>
              </h2>
            )
          },
          h3: ({ children }) => {
            const raw = getNodeText(children)
            const id = slugifyHeading(raw)
            return (
              <h3
                id={id}
                className="group relative text-lg sm:text-xl font-semibold tracking-tight text-foreground mt-7 mb-2 scroll-mt-24"
              >
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <span>{children}</span>
                  <span className="opacity-0 group-hover:opacity-60 text-muted-foreground text-xs font-mono transition-opacity">
                    #
                  </span>
                </a>
              </h3>
            )
          },
          p: ({ children }) => (
            <p className="my-4 text-foreground/85 leading-[1.75]">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-4 pl-5 list-disc space-y-1.5 text-foreground/85 marker:text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 pl-5 list-decimal space-y-1.5 text-foreground/85 marker:text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 pl-4 border-l-2 border-accent/80 italic text-muted-foreground bg-secondary/30 py-2 pr-3 rounded-r-md">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary/60 text-foreground border-b border-border font-medium">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border/60">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-secondary/20 transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="p-3 font-semibold text-foreground">{children}</th>
          ),
          td: ({ children }) => (
            <td className="p-3 text-muted-foreground">{children}</td>
          ),
          hr: () => <hr className="my-8 border-border" />,
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http")
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity font-medium"
              >
                {children}
              </a>
            )
          },
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          code: ({ className, children }: any) => {
            const match = /language-(\w+)/.exec(className || "")
            const isBlock = match || (typeof children === "string" && children.includes("\n"))

            if (isBlock) {
              return (
                <CodeBlock language={match ? match[1] : ""}>
                  {String(children).replace(/\n$/, "")}
                </CodeBlock>
              )
            }

            return (
              <code className="px-1.5 py-0.5 rounded text-[13px] font-mono bg-secondary text-foreground/90 border border-border/60">
                {children}
              </code>
            )
          },
          pre: ({ children }: any) => {
            // Let the custom code component handle rendering
            return <>{children}</>
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
