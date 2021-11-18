import Link from 'next/link'
import { useRouter } from "next/router"

const LinkComponent = ({data, children}) => {

    let router = useRouter()

    let lang = router.query.lang
    

    if(data === null) {
        return <a>{ children }</a>;
    }

    if(data._linkType === 'Link.web') {
        return <a href={data.url} target="_blank" rel="noreferrer">{children}</a>
    }

    if (data._linkType === 'Link.file') {
        return <a href={data.url} target="_blank" rel="noreferrer">{children}</a>
    }

    if (data._linkType === 'Link.document') {

        if(data._meta.uid === null) return null;

        let split = data._meta.uid.split("__")
        
        if(split.length === 2) {
            let newUrl = `/${lang}/${split[0]}/${split[1]}`

            return (
                <Link href={newUrl} scroll={false}>
                    <a className={router.asPath === newUrl ? "active-link" : ""}>{children}</a>
                </Link>               
            )
        }

        split = data._meta.uid.split("_")

        if(split.length === 2) {
            let newUrl = `/${lang}/${split[0]}#${split[1]}`

            return (
                <Link href={newUrl} scroll={false}>
                    <a className={router.asPath === newUrl ? "active-link" : ""}>{children}</a>
                </Link>               
            )
        }

        let newUrl = `/${lang}/${data._meta.uid !== null ? data._meta.uid : "/"}`

        return (
            <Link href={newUrl} scroll={false}>
                <a className={router.asPath === newUrl ? "active-link" : ""}>{children}</a>
            </Link>
        )
    }

    return <span>{children}</span>

}

export default LinkComponent