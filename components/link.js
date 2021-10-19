import Link from 'next/link'

const LinkComponent = ({data, children}) => {
    

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
            return (
                <Link href={`/${split[0]}/${split[1]}`} scroll={false}>
                    <a>{children}</a>
                </Link>               
            )
        }

        return (
            <Link href={`/${data._meta.uid !== null ? data._meta.uid : "/"}`} scroll={false}>
                <a>{children}</a>
            </Link>
        )
    }

    return null

}

export default LinkComponent