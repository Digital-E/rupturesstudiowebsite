import Image from "./image"
import Video from "./video"

const Media = ({ asset, windowHeight }) => {

    return asset.image !== null ?
        <Image src={asset.image} windowHeight={windowHeight} />
        :
        <Video src={asset.video} width={asset.video_width} height={asset.video_height} windowHeight={windowHeight}/>
}

export default Media;