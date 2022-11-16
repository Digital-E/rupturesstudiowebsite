import styled from "styled-components";

import Tag from "./tag"

const TagsWrapper = styled.div`
    overflow: scroll;
`

const Tags = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    pointer-events: none;
    width: fit-content;
`;

const Component = ({ data, clickable }) => {

    return (
        <TagsWrapper className="tags">
            <Tags>
                <Tag alt={true}>{data.year}</Tag>
                {data.tags?.map(item => <Tag clickable={clickable}>{item.tag}</Tag>)}
            </Tags>
        </TagsWrapper>
    )
}

export default Component