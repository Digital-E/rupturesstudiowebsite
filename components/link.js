import Link from 'next/link'
import { useRouter } from "next/router"

const LinkComponent = ({data, children}) => {

    let router = useRouter()

    if(data === null) {
        return <a>{ children }</a>;
    }

    if(data._linkType === 'Link.web' || data.link_type === 'Web') {
        return <a href={data.url} target="_blank" rel="noreferrer">
            {children}
            <span>
                <svg x="0px" y="0px"
                    viewBox="0 0 460.8 460.7"
                    className="link-out-icon"
                    >
                <g>
                    <path d="M295.7,32.9h50.1H426h18.3l-16.4-16.4v50.1v80.2v18.3c0,8.6,7.5,16.8,16.4,16.4c8.9-0.4,16.4-7.2,16.4-16.4V115V34.8V16.5
                        c0-8.9-7.5-16.4-16.4-16.4h-50.1H314h-18.3c-8.6,0-16.8,7.5-16.4,16.4C279.6,25.3,286.4,32.9,295.7,32.9z"/>
                    <path d="M209.2,274.8L425.6,58.4c10-10,20.1-19.8,30-30l0.4-0.4c6.1-6.1,6.5-17.2,0-23.2c-6.6-6-16.7-6.5-23.2,0l-83.5,83.5
                        c-23.8,23.8-47.6,47.6-71.4,71.3c-20.6,20.6-41.1,41.1-61.6,61.6c-10,10-20.1,19.8-30,30c-0.2,0.2-0.3,0.3-0.4,0.4
                        c-6.1,6.1-6.5,17.2,0,23.2C192.6,280.8,202.7,281.3,209.2,274.8L209.2,274.8z"/>
                    <path d="M428,252.7v53.6v83.1c0,7.3,0.6,14.9-0.4,22.1c0.2-1.5,0.4-2.9,0.6-4.4c-0.5,3.2-1.3,6.2-2.5,9.2c0.5-1.3,1.1-2.6,1.6-3.9
                        c-0.9,2.2-2,4.3-3.3,6.3c-0.3,0.5-0.7,1-1,1.5c-0.9,1.4,2.9-3.4,1-1.4c-0.8,0.9-1.5,1.8-2.4,2.6c-0.8,0.8-1.8,1.6-2.6,2.4
                        c-1.7,1.5,1.6-1.3,1.6-1.3c0,0.1-1.3,0.9-1.5,1c-2.1,1.4-4.3,2.6-6.6,3.6l3.9-1.6c-3,1.2-6,2-9.2,2.5c1.5-0.2,2.9-0.4,4.4-0.6
                        c-4.5,0.6-9.1,0.4-13.7,0.4h-25.4H288H185H96.4c-13.9,0-27.8,0.1-41.6,0c-1.9,0-3.7-0.1-5.6-0.4c1.5,0.2,2.9,0.4,4.4,0.6
                        c-3.2-0.5-6.2-1.3-9.2-2.5l3.9,1.6c-2.2-0.9-4.3-2-6.3-3.3c-0.5-0.3-1-0.7-1.5-1c-1.4-0.9,3.4,2.9,1.4,1c-0.9-0.8-1.8-1.5-2.6-2.4
                        c-0.8-0.8-1.6-1.8-2.4-2.6c-1.5-1.7,1.3,1.6,1.3,1.6c-0.1,0-0.9-1.3-1-1.5c-1.4-2.1-2.6-4.3-3.6-6.6l1.6,3.9c-1.2-3-2-6-2.5-9.2
                        c0.2,1.5,0.4,2.9,0.6,4.4c-0.6-4.5-0.4-9.1-0.4-13.7v-25.4v-84.7V185V96.4c0-13.9-0.1-27.8,0-41.6c0-1.9,0.1-3.7,0.4-5.6
                        c-0.2,1.5-0.4,2.9-0.6,4.4c0.5-3.2,1.3-6.2,2.5-9.2l-1.6,3.9c0.9-2.2,2-4.3,3.3-6.3c0.3-0.5,0.7-1,1-1.5c0.9-1.4-2.9,3.4-1,1.4
                        c0.8-0.9,1.5-1.8,2.4-2.6c0.8-0.8,1.8-1.6,2.6-2.4c1.7-1.5-1.6,1.3-1.6,1.3c0-0.1,1.3-0.9,1.5-1c2.1-1.4,4.3-2.6,6.6-3.6
                        c-1.3,0.5-2.6,1.1-3.9,1.6c3-1.2,6-2,9.2-2.5c-1.5,0.2-2.9,0.4-4.4,0.6c6.1-0.8,12.6-0.4,18.8-0.4h36.5h84.2h19.5
                        c8.6,0,16.8-7.5,16.4-16.4C224.2,7.5,217.4,0,208.2,0h-43.9H87H60.7H55c-8.5,0-16.5,2-24.2,5.5c-18.8,8.6-30.6,28.7-30.7,49v7.4
                        v43.6v69.9v80v75.5v55.4c0,9.9-0.5,19.9,0.9,29.6c1.6,10.9,7.6,21.7,15.5,29.3c9.4,9,21,13.8,33.8,15.3c3.1,0.3,6.2,0.2,9.3,0.2
                        h40.1h67.7h79.8h76.4h58.4c8.1,0,16.1,0.1,24.2,0c9.7-0.1,19.5-2.6,27.9-7.7c10.8-6.6,18.4-16.3,23.1-27.9
                        c3.3-8.2,3.4-16.9,3.4-25.6v-65.1v-69.8v-11.9c0-8.6-7.5-16.8-16.4-16.4C435.5,236.7,428,243.5,428,252.7L428,252.7z"/>
                </g>
                </svg>                                
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