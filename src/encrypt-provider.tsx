import * as React from 'react'
import { desDecrypt, defaultEncryptKey } from './utils/encrypt'
import { Logs } from './utils/logs'

interface Props {
  children?: React.ReactNode
  _encrypted?: string
  _type?: string
  _iv?: string
}

interface KeyProps {
  encryptKey?: string
}

interface PropsDecrypt {}

export const AppEncryptProvider: React.FunctionComponent<Props & KeyProps> = ({ children, ...props }) => {
  const props2 = getProps(props)
  return <>{cloneElementWithProps(children, props2)}</>
}

const getProps = (props: Props & KeyProps) => {
  Logs.debug('getProps', props)
  const { encryptKey = defaultEncryptKey, _encrypted: encrypted, _type: type, _iv: iv } = props
  switch (type) {
    case 'base64':
      return JSON.parse(Buffer.from(encrypted!, 'base64').toString('utf-8')) as PropsDecrypt
    case 'des':
      return JSON.parse(desDecrypt(encrypted!, encryptKey, iv!)) as PropsDecrypt
    default:
      return props as PropsDecrypt
  }
}

export function cloneElementWithProps<P>(element: any, props: P) {
  if (!React.isValidElement(element)) {
    return element
  }
  return React.cloneElement(element, props as any)
}
