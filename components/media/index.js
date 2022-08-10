import Image from "./image"
import Video from "./video"

const Media = ({ asset }) => {

    return <Image src={asset.hero_image} />

    // <Video src={asset} />
    // <SliceWrapper key={slice._id}><Video data={slice.video} id={`video-${index}`}/></SliceWrapper>

    // return asset.image !== null ?
    //     <Image src={asset.image}/>
    //     :
    //     <Video src={asset.video} width={asset.video_width} height={asset.video_height}/>
}

export default Media;