import styled from "styled-components"

import EmailSubscribeForm from "./email-subscribe-form"

const PrismicDOM = require("prismic-dom");

const Container = styled.div`
    background-color: #E8E9E9;
    padding: 100px 0;

    > div:nth-child(1) {
        width: fit-content;
        margin: 0 auto 40px auto;
        color: black;
    }

    @media(max-width: 989px) {
        padding: 60px 0;

        > div:nth-child(1) {
            width: fit-content;
            margin: 0 40px 40px 40px;
            text-align: center;
        }
    }
`;

const EmailSubscribe = ({ data }) => {
    return (
        <Container>
            <div
                    dangerouslySetInnerHTML={{
                    __html:
                        data.email_subscribe_text && PrismicDOM.RichText.asHtml(data.email_subscribe_text),
                    }}
            /> 
            <div>
                <EmailSubscribeForm />
            </div>
        </Container>
    )
}

export default EmailSubscribe

