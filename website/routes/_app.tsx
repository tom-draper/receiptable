import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
	return (
		<html>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Receiptable API</title>
				{/* <link rel="icon" href="/receipt.png" /> */}
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="stylesheet" href="/styles.css" />
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css" />

				{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"></link> */}
			</head>
			<body>
				<Component />
			</body>
		</html>
	);
}
