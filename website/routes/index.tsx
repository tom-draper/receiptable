import { Navigation } from "../components/Navigation.tsx";
import { InteractiveExample } from "../islands/InteractiveExample.tsx";
import { Receipt } from "../components/Receipt.tsx";
import { Usage } from "../components/Usage.tsx";
import { Footer } from "../components/Footer.tsx";
import { Actions } from "../components/Actions.tsx";
import { Pricing } from "../components/Pricing.tsx";
import PrintOnLoad from "../islands/PrintOnLoad.tsx";

export default function Home() {
	return (
		<div>
			<PrintOnLoad />
			<Navigation />
			<div class="p-4">
				<div class="py-4 mx-auto">
					<div class="pt-[15%]">
						<div class="grid place-items-center animate-receipt-appear">
							<Receipt />
						</div>
					</div>
				</div>
				<InteractiveExample />
				<Usage />
				{/* <Pricing /> */}
				<div class="text-center text-[16px] underline max-sm:text-[14px] max-sm:my-8">
					<a href="https://receiptable.dev/sign-up" class="hover:text-[">Grab your API Key</a>
				</div>
				<Actions />
				<Footer />
			</div>
		</div>
	);
}