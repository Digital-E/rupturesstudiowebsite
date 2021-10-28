import { useEffect } from "react"
import router, { useRouter } from "next/router"

export default function Index({ preview, data, footerData }) {

    useEffect(() => {
        let lang = window.navigator.language
        if(lang === "en-GB") {
            router.replace("/en-gb")
        } else if (lang === "fr-FR") {
            router.replace("/fr-fr")
        } else {
            router.replace("/en-gb")
        }
    },[])

    return null
  }