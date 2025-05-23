import { useEffect, useRef } from "preact/hooks";

interface MarkdownContentProps {
	content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
	const contentRef = useRef<HTMLDivElement>(null);

	// Load and apply Prism highlighting on client side
	useEffect(() => {
		const loadPrism = async () => {
			if (typeof window === 'undefined') return;

			try {
				// For Fresh we use dynamic imports
				const Prism = await import('prismjs');

				// Import the necessary languages - add more as needed for your documentation
				await import('prismjs/components/prism-javascript');
				await import('prismjs/components/prism-python');
				await import('prismjs/components/prism-bash');
				await import('prismjs/components/prism-json');
				await import('prismjs/components/prism-csharp');
				await import('prismjs/components/prism-typescript');

				// Highlight all code blocks
				Prism.default.highlightAll();
			} catch (error) {
				console.error('Failed to load Prism:', error);
			}
		};

		loadPrism();
	}, []);

	return (
		<div
			ref={contentRef}
			class="ml-[calc(43ch+3rem+2rem)] prose markdown-body mx-auto p-4 pt-[1px] px-6"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}