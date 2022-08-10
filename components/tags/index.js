import styled from "styled-components";

import Tag from "./tag"

const Tags = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 8px;
`;

const Component = ({ data }) => {

    return (
        <Tags>
            <Tag alt={true}>{data.year}</Tag>
            {data.tags?.map(item => <Tag>{item.tag}</Tag>)}
        </Tags>
    )
}

export default Component