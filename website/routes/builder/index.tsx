import { Navigation } from "../../components/Navigation.tsx";
import Builder from "../../islands/builder/Builder.tsx";
import { serverUrl } from "../../lib/consts.ts";

export default function BuilderPage() {
	return (
		<div>
			<Navigation />

			<Builder serverUrl={serverUrl} />
		</div>
	);
}