import Locale from "./locale";
import Theme from "./theme";

export default function UtilityBar({locale}: {locale: string}){
    return(
        <section className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-400 h-24 p-5 drop-shadow flex items-start gap-5 rounded-b-2xl z-20 bg-white/10 dark:bg-[#0B0B0B]/10 dark:border-none border border-zinc-800/5 duration-300 backdrop-blur">
            <Theme></Theme>
            <Locale locale={locale}></Locale>
        </section>
    );
}