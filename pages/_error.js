import Error from 'next/error'

export async function getServerSideProps() {

  return {
    props: {},
  }
}

export default function Page({ 
    // errorCode, stars 
}) {

    if (typeof window !== "undefined") {
        window.location.href = "/404"
    }

    return null

}