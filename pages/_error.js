import { useEffect } from "react"
import router, { useRouter } from "next/router"



const Component = () => {
    let router = useRouter();

    useEffect(() => {
        let lang = window.navigator.language
        let asPath = router.asPath

        console.log(router)

        // if(lang === "en-GB") {
        //     router.replace(`/en-gb${asPath}`)
        // } else if (lang === "fr-FR") {
        //     router.replace(`/fr-fr${asPath}`)
        // } else {
        //     router.replace(`/en-gb${asPath}`)
        // }
    },[])

    return null
}


export default Component;
