import styled from "styled-components"

import EmailSubscribeForm from "./email-subscribe-form"

const PrismicDOM = require("prismic-dom");

const Container = styled.div`
    padding: 0 20px;

    > div:nth-child(1) {

    }

    @media(max-width: 989px) {
        > div:nth-child(1) {
        }
    }
`;

const EmailSubscribe = ({ data }) => {
    return (
        <Container>
            {/* <div
                    dangerouslySetInnerHTML={{
                    __html:
                        data.email_subscribe_text && PrismicDOM.RichText.asHtml(data.email_subscribe_text),
                    }}
            />  */}
            <div>
                <EmailSubscribeForm data={data}/>
            </div>
        </Container>
    )
}

export default EmailSubscribe

