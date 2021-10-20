import { RichText } from 'prismic-reactjs';
import htmlSerializer from "./html-serializer";

const Component = ({ render }) => {
    return <RichText render={render} htmlSerializer={htmlSerializer} />
}

export default Component;