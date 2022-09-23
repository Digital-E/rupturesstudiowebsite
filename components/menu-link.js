import Link from 'next/link';
import { useRouter } from "next/router";


const LinkComponent = ({href, children}) => {
    const router = useRouter();

    // let lang = router.query.lang

    // if(lang === undefined) {
    //     lang = "en-gb"
    // }

    // let split = href.split("__")
        
    // if(split.length === 2) {
    //     let newUrl = `/${lang}/${split[0]}/${split[1]}`

    //     return (
    //         <Link href={newUrl} scroll={false}>
    //             <a className={router.asPath === newUrl ? "active-link" : ""}>{children}</a>
    //         </Link>               
    //     )
    // }

    // let newUrl = `/${lang}/${href !== null ? href : ""}`
    
    return (
        <Link href={`/${href}`} scroll={false}>
            <a className={router.asPath === href ? "active-link" : ""}>{children}</a>
        </Link>
    )
}

export default LinkComponent