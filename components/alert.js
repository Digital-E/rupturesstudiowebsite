import Link from 'next/link'
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  width: fit-content;
  padding: 15px;
  border: 1px solid black;

  a {
    color: red
  }
`

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  justify-content: center;
  left: 0;
  z-index: 999;
  top: 90vh;
`



const Alert = ({ preview }) => {

  return (
    <div>
        {preview ? (
          <Wrapper>
          <Container data-scroll data-scroll-sticky data-scroll-target="body">
            This is page is a preview.{" "}
            <Link href="/api/exit-preview">
              <a>
                Click here
              </a>
            </Link>
            {" "}
            to exit preview mode.
          </Container>
          </Wrapper>
        ) : null}
    </div>
  );
}

export default Alert
