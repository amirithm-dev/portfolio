import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "use-intl";

export default function Biography({showMore, locale}: {showMore: React.SetStateAction<boolean>, locale: string}){
    const t = useTranslations("hero");

    return(
        <div className={(locale === "fa" ? "text-right" : "text-left") + " dark:text-white text-zinc-800 w-full p-1"}>
            <p dir={locale === "fa" ? "rtl" : "ltr"} className="text-xl">{t("bio.p1")}</p>

            
            <motion.div
            initial={{ height: 0 }}
            animate={{ height: showMore ? "auto" : "0px" }}
            transition={{ type: "tween" }}
            className="overflow-hidden mt-5 flex flex-col gap-2">
                <p dir={locale === "fa" ? "rtl" : "ltr"} className="opacity-90 text-pretty">{t("bio.p2")}</p>
                <p dir={locale === "fa" ? "rtl" : "ltr"} className="opacity-90 text-pretty">{t("bio.p3")}</p>
                <p dir={locale === "fa" ? "rtl" : "ltr"} className="opacity-90 text-pretty">{t("bio.p4")}</p>
            </motion.div>
        </div>
    );
}