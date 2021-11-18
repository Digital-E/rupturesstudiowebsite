import Error from 'next/error'

export async function getServerSideProps() {

  return {
    props: {},
  }
}

export default function Page({ 
    // errorCode, stars 
}) {

    window.location.href = "/404"

    return null

}