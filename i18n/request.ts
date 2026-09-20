import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'vinext/shims/headers';
 
export default getRequestConfig(async () => {
  const store = await cookies();
  let locale = store.get("locale")?.value || "en";
  
  if(locale === "fa"){
    locale = 'fa';
  }else{
    locale = 'en';
  }
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});