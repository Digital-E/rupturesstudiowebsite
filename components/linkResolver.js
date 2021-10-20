const linkResolver = (data) => {

    if(data.uid === null) return null;

    let split = data.uid.split("__")
    
    if(split.length === 2) {
        return `/${split[0]}/${split[1]}`
    }

    return `/${data.uid !== null ? data.uid : "/"}`
  
  }

  export default linkResolver