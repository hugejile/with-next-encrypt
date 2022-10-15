# with-next-encrypt

Encrypt NEXT NEXT_DATA props. It's very important to encrypt sensitive data in some cases, for example, client side js rendering user's account, access token to avoid spider's Crawling, proxy caches.

## Install

```bash
npm install with-next-encrypt
or
yarn add with-next-encrypt
```

## How to use

_app.ts

```typescript
import type { AppProps } from "next/app";
import { AppEncryptProvider } from "with-next-encrypt";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppEncryptProvider {...pageProps} encryptKey={process.env.withNextEncryptKey}>
      <Component {...pageProps} />
    </*AppEncryptProvider> 
  );
}

export default MyApp;

```

index.tsx

```typescript
export const getServerSideProps: GetServerSideProps<any> =
  withEncryptedServerSide(async (ctx: GetServerSidePropsContext) => {
    return { props: { t: 'I am encrypted' } };
  });
```

.next.config (global config)

```javascript
module.exports = {
  reactStrictMode: true,
  env: {
    withNextEncryptOption: 'des', //des, base64, off
    withNextEncryptKey: '12345678' //optional
  },
}

```

html output should be

```html
<script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{"_encrypted":"EvfKzmG7G6ScSke+oYhNdMzdp3PQdnLY","_iv":"19837278","_type":"des"},"__N_SSP":true},"page":"/","query":{},"buildId":"development","isFallback":false,"gssp":true,"scriptLoader":[]}</script>
```