import Link from 'next/link';
import { useRouter } from "next/router";


const LinkComponent = ({href, children}) => {
    const router = useRouter();

    let split = href.split("__")
        
    if(split.length === 2) {
        return (
            <Link href={`/${split[0]}/${split[1]}`} scroll={false}>
                <a className={router.asPath === `/${split[0]}/${split[1]}` ? "active-link" : ""}>{children}</a>
            </Link>               
        )
    }

    return (
        <Link href={`${href !== null ? href : "/"}`} scroll={false}>
            <a className={router.asPath === href ? "active-link" : ""}>{children}</a>
        </Link>
    )
}

export default LinkComponent