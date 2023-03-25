# with-next-encrypt

Encrypt NEXT NEXT_DATA props. It's very important to encrypt sensitive data in some cases, for example, client side js rendering user's account, access token. encrypt NEXT_DATA to avoid spider's Crawling, proxy caching.

## Install

```bash
npm install with-next-encrypt
or
yarn add with-next-encrypt
```

## How to use

.next.config (global config encrypt option and key)

```javascript
module.exports = {
  reactStrictMode: true,
  env: {
    withNextEncryptOption: 'des', //des, base64, off
    withNextEncryptKey: '12345678' //optional
  },
}

```

_app.ts (config **AppEncryptProvider** with encryptKey)

```typescript
import type { AppProps } from "next/app";
import { AppEncryptProvider } from "with-next-encrypt";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppEncryptProvider {...pageProps} encryptKey={process.env.withNextEncryptKey}>
      <Component {...pageProps} />
    </AppEncryptProvider> 
  );
}

export default MyApp;

```

index.tsx (add withEncryptedServerSide function)

```typescript
import type { GetServerSideProps, GetServerSidePropsContext, NextPage, } from "next";
import { withEncryptedServerSide } from "with-next-encrypt";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage<any> = ({t}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {t ?? 'no defined'}
        </h1>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<any> =
  withEncryptedServerSide(async (ctx: GetServerSidePropsContext) => {
    return { props: { t: 'I am encrypted' } };
  });
export default Home;

```

html output **NEXT_DATA** should be

```html
<script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{"_encrypted":"EvfKzmG7G6ScSke+oYhNdMzdp3PQdnLY","_iv":"19837278","_type":"des"},"__N_SSP":true},"page":"/","query":{},"buildId":"development","isFallback":false,"gssp":true,"scriptLoader":[]}</script>
```

Example app site: https://with-next-encrypt-example.vercel.app/