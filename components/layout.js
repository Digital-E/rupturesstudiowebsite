import Alert from "../components/alert";
import Footer from "../components/footer";
import Meta from "../components/meta";

import styled from "styled-components";

const Container = styled.div``;

export default function Layout({ preview, children, name, content, footerData }) {


  return (
    <>
      <Meta name={name} content={content}/>
      <Container>
        <Alert preview={preview} />
        <main>
          {children}
          {/* <Footer data={footerData[0].node} /> */}
        </main>
      </Container>
    </>
  );
}
