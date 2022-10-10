// import Carousel from "./carousel"
// import Quote from "./quote"
import MediaGallery from "./media-gallery"
// import SingleMedia from "./single-media"
// import TextColumns from "./text-columns"
import Text from "./text"
// import MediaAndText from "./media-and-text"
// import Embed from "./embed"

const SliceSwitch = ({ data, keyProp }) => {

    switch(data.__typename) {
        // case "carousel.carousel":
        // return <Carousel key={data.id} data={data}/>;
        // break;
        // case "quote.quote":
        // return <Quote key={data.id} data={data}/>;
        // break;
        case "ProjectSlicesMedia_gallery":
        return <MediaGallery keyProp={keyProp} data={data} />;
        break;
        // case "singlemedia.single-media":
        // return <SingleMedia key={data.id} data={data}/>;
        // break;
        // case "textcolumns.text-columns":
        // return <TextColumns key={data.id} data={data}/>;
        // break;
        case "ProjectSlicesText":
        return <Text keyProp={keyProp} data={data}/>;
        break;
        // case "embed.embed":
        // return <Embed key={data.id} data={data}/>;
        // break;        
        // case "mediaandtext.media-and-text":
        // return <MediaAndText key={data.id} data={data}/>;                                                
        default:
        return null
    }
}

export default ({ data }) => {
    return data.slices?.map((item, index) => <SliceSwitch keyProp={`${item.__typename}-${index}`} data={item} /> )
}