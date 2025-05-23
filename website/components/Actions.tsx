

export function Actions() {
    return (
        <div id="actions" class="flex items-center justify-center gap-4 mt-8 max-sm:text-[14px] text-[16px]">
            <div>
                <a href="/sign-up">
                    <div class="w-40 h-16 grid place-items-center bg-[#eeeeee]">Get Started</div>
                </a>
            </div>
            <div>
                <a href="/builder">
                    <div class="w-40 h-16 grid place-items-center bg-[#eeeeee]">Builder</div>
                </a>
            </div>
            <div>
                <a href="/docs">
                    <div class="w-40 h-16 grid place-items-center bg-[#eeeeee]">Docs</div>
                </a>
            </div>
        </div>
    )
}