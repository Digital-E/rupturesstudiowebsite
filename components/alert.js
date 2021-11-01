import Link from 'next/link'
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  z-index: 999;
  bottom: 50px;
  background: white;
  width: fit-content;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px;
  border: 1px solid black;
`


const Alert = ({ preview }) => {
  return (
    <div>
        {preview ? (
          <Container>
            This is page is a preview.{" "}
            <Link href="/api/exit-preview">
              <a>
                Click here
              </a>
            </Link>
            {" "}
            to exit preview mode.
          </Container>
        ) : null}
    </div>
  );
}

export default Alert
