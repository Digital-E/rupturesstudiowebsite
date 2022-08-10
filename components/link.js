import Link from 'next/link'
import { useRouter } from "next/router"

const LinkComponent = ({data, children}) => {

    let router = useRouter()

    let lang = router.query.lang

    // if(lang === undefined) {
    //     lang = "en-gb"
    // }

    if(data === null) {
        return <a>{ children }</a>;
    }

    if(data._linkType === 'Link.web' || data.link_type === 'Web') {
        return <a href={data.url} target="_blank" rel="noreferrer">
            {children}
            <span>
                <img src="/images/link-icon.svg" className="link-out-icon" />                
            </span>
            </a>
    }

    if (data._linkType === 'Link.file' || data.link_type === 'File') {
        return <a href={data.url} target="_blank" rel="noreferrer">{children}</a>
    }

    if (data._linkType === 'Link.document' || data.link_type === 'Document') {

        if(data._meta.uid === null) return null;

        // let split = data._meta.uid.split("__")
        
        // if(split.length === 2) {
        //     let newUrl = `/${lang}/${split[0]}/${split[1]}`

        //     return (
        //         <Link href={newUrl} scroll={false}>
        //             <a className={router.asPath === newUrl ? "active-link" : ""}>{children}</a>
        //         </Link>               
        //     )
        // }

        // split = data._meta.uid.split("_")

        // if(split.length === 2) {
        //     let newUrl = `/${lang}/${split[0]}#${split[1]}`

        //     return (
        //         <Link href={newUrl} scroll={false}>
        //             <a className={router.asPath === newUrl ? "active-link" : ""}>{children}</a>
        //         </Link>               
        //     )
        // }

        // let newUrl = `/${lang}/${data._meta.uid !== null ? data._meta.uid : "/"}`

        // return (
        //     <Link href={newUrl} scroll={false}>
        //         <a className={router.asPath === newUrl ? "active-link" : ""}>{children}</a>
        //     </Link>
        // )

        return (
            <Link href={data._meta.uid} scroll={false}>
                <a className={router.asPath === data._meta.uid ? "active-link" : ""}>{children}</a>
            </Link>
        )
    }

    return <span>{children}</span>

}

export default LinkComponent