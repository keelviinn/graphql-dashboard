import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function produtos() {

  return (
    <h1>hello</h1>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'ecommerce.token': token } = parseCookies(ctx);

  if (!token) return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }

  return { props: {} } 
}