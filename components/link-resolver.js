import { useRouter } from "next/router"

const linkResolver = (data) => {

    let router = useRouter()

    let lang = router.query.lang


    if(data.uid === null) return null;

    let split = data.uid.split("__")
    
    if(split.length === 2) {
        let newUrl = `/${lang}/${split[0]}/${split[1]}`

        return newUrl
    }

    let newUrl = `/${lang}/${data.uid}`

    return newUrl
  
  }

  export default linkResolver