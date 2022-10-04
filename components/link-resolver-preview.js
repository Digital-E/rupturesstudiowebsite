
const LinkResolver = (data) => {

    let addProjectPrefix = (data, url) => {
        if(data.type === 'project') {
            return `/projects${url}`
        } else {
            return url
        }
    }

    let lang = data.lang

    if(data.uid === null) return null;

    let split = data.uid.split("__")
    
    if(split.length === 2) {
        // let newUrl = `/${lang}/${split[0]}/${split[1]}`
        let newUrl = `/${split[0]}/${split[1]}`

        return addProjectPrefix(data, newUrl)
    }

    split = data.uid.split("_")

    if(split.length === 2) {
        // let newUrl = `/${lang}/${split[0]}#${split[1]}`
        let newUrl = `/${split[0]}#${split[1]}`

        return addProjectPrefix(data, newUrl)
    }

    // let newUrl = `/${lang}/${data.uid}`
    let newUrl = `/${data.uid}`

    return addProjectPrefix(data, newUrl)
  
  }

  export default LinkResolver