import Chatbot from "@/components/chatbot";
import Footer from "@/components/footer";
import Hero from "@/components/hero/hero";
import Skills from "@/components/skills";
import UtilityBar from "@/components/utility-bar/utility-bar";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

export default async function Home() {
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";
  const t = await getTranslations('Skills');

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full dark:bg-[#0B0B0B] bg-[#F7F7F5] duration-300">
        <UtilityBar locale={locale}></UtilityBar>
        <Hero locale={locale}></Hero>
        <Skills locale={locale} skills_title={t("title")}></Skills>
        <Chatbot></Chatbot>
        <Footer></Footer>
      </main>
    </div>
  );
}
