import Link from "./link";
import Button from "./button";

const ButtonLink = ({ data, secondary, children }) => {
    return <Link data={data}><Button secondary={secondary}>{children}</Button></Link>
}

export default ButtonLink