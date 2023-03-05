import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  typeof window !== "undefined" && router.push("/roomDetails");
  return (
    <>
      <Head>
        <title>eMunshi App</title>
        <meta name="description" content="App to manage your Room Rent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
}
