import * as crypto from 'crypto'

export const defaultEncryptKey = 'HelloKit';

export const desEncrypt = (info: string, key:string, iv: string): string => {
  const cipher = crypto.createCipheriv('des', key, iv)
  let ecrStr = cipher.update(info, 'utf8', 'base64')
  ecrStr += cipher.final('base64')  
  return ecrStr
}

export const desDecrypt = (info: string, key:string,  iv: string): string => {
  const decipher = crypto.createDecipheriv('des', key, iv)
  let desStr = decipher.update(info, 'base64', 'utf8')
  desStr += decipher.final('utf8')

  return desStr
}