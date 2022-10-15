import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { defaultEncryptKey, desEncrypt } from './utils/encrypt'

export type EncryptOptions = 'des' | 'base64' | 'off'

export function withEncryptedServerSide<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
  encryptOptions?: EncryptOptions
) {
  return async function nextGetServerSidePropsHandlerWrappedWithIronSession(ctx: GetServerSidePropsContext) {
    const r = await handler(ctx)

    if (!encryptOptions) encryptOptions = process.env.withNextEncryptOption as EncryptOptions

    if ((r as any).props) {
      switch (encryptOptions) {
        case 'des':
          let key = process.env.withNextEncryptKey ?? defaultEncryptKey
          const iv = new Date().getTime().toString().substring(5, 13)
          const encrypted = desEncrypt(JSON.stringify((r as any).props), key, iv)
          r['props'] = { _encrypted: encrypted, _iv: iv, _type: encryptOptions }
          break
        case 'base64':
          r['props'] = {
            _encrypted: Buffer.from(JSON.stringify((r as any).props)).toString('base64'),
            _type: encryptOptions
          }
          break
        default:
          console.error('SERVER_SIDE_ENCRYPT not defined')
          break
      }
    }

    return r
  }
}
