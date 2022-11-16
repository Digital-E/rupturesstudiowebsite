import Link from 'next/link';
import { useRouter } from "next/router";


const LinkComponent = ({href, children}) => {
    const router = useRouter();

    
    return (
        <Link href={`/${href}`} scroll={false}>
            <a className={router.asPath === href ? "active-link" : ""}>{children}</a>
        </Link>
    )
}

export default LinkComponent