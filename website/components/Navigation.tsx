export function Navigation() {
    return (
        <nav class="bg-white">
            <div class="mx-[20%] flex items-center justify-between px-4 py-4 text-xl font-medium">
                <h1 class="mx-3"><a href="/">Receiptable API</a></h1>

                <div class="text-sm">
                    <a class="mx-3 relative group cursor-pointer" href="/">
                        <span class="invisible group-hover:visible absolute right-full">*</span>
                        Home
                        <span class="invisible group-hover:visible absolute left-full">*</span>
                    </a>
                    <a class="mx-3 relative group cursor-pointer" href="/docs">
                        <span class="invisible group-hover:visible absolute right-full">*</span>
                        Docs
                        <span class="invisible group-hover:visible absolute left-full">*</span>
                    </a>
                    <a class="mx-3 relative group cursor-pointer" href="/builder">
                        <span class="invisible group-hover:visible absolute right-full">*</span>
                        Builder
                        <span class="invisible group-hover:visible absolute left-full">*</span>
                    </a>
                    {/* <a class="mx-3 relative group cursor-pointer" href="/#pricing">
                        <span class="invisible group-hover:visible absolute right-full">*</span>
                        Pricing
                        <span class="invisible group-hover:visible absolute left-full">*</span>
                    </a> */}
                    <a class="mx-3 relative group cursor-pointer" href="https://github.com/tom-draper/receiptable" target="_blank">
                        <span class="invisible group-hover:visible absolute right-full">*</span>
                        Source
                        <span class="invisible group-hover:visible absolute left-full">*</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}