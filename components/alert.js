import Link from 'next/link'

const Alert = ({ preview }) => {
  return (
    <div>
        {preview ? (
          <div>
            This is page is a preview.{" "}
            <Link href="/api/exit-preview">
              <a>
                Click here
              </a>
            </Link>
            {" "}
            to exit preview mode.
          </div>
        ) : null}
    </div>
  );
}

export default Alert
