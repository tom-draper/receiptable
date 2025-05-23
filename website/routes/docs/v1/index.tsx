import MarkdownIt from "npm:markdown-it";
import markdownItAnchor from "npm:markdown-it-anchor";
import { Handlers, PageProps } from "$fresh/server.ts";
import NavigationV1 from "../../../islands/docs/NavigationV1.tsx";
import MarkdownContent from "../../../islands/docs/MarkdownContent.tsx";

type Data = {
	content: string;
};

export const handler: Handlers<Data> = {
	async GET(_, ctx) {
		const raw = await Deno.readTextFile("./docs/v1.md");
		const md = new MarkdownIt({
			html: true,
			linkify: true,
			typographer: true,
			highlight: function (str, lang) {
				// Add language class to code blocks for client-side highlighting
				return `<pre class="language-${lang}"><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`;
			}
		});

		// Add the markdown-it-anchor plugin
		md.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.headerLink(),
			permalinkSymbol: '',
			permalinkClass: 'anchor-link',
			permalinkBefore: true
		});

		const html = md.render(raw);
		return ctx.render({ content: html });
	},
};

export default function DocsV1Page({ data }: PageProps<Data>) {
	return (
		<div>
			<NavigationV1 />

			<div>
				<MarkdownContent content={data.content} />
			</div>

			<style dangerouslySetInnerHTML={{
				__html: `
        .anchor-link {
          opacity: 0.5;
          margin-right: 0em;
          text-decoration: none;
        }
        
        h1:hover .anchor-link,
        h2:hover .anchor-link,
        h3:hover .anchor-link,
        h4:hover .anchor-link,
        h5:hover .anchor-link,
        h6:hover .anchor-link {
          opacity: 1;
        }
      ` }} />
		</div>
	);
}