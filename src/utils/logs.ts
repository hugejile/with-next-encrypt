/* eslint-disable no-console */
/* tslint:disable:no-console */
/* tslint:disable:ban-types */
/* tslint:disable:no-empty */

const options = { hour12: false }
const transports = []

export class Logs {

  /**
   *
   * @param message
   * @param optionalParams
   * @returns
   */
  public static debug(message?: any, ...optionalParams: any[]): void {
    if (process.env.NODE_ENV === 'production') return

    if (typeof window === 'undefined') {
      // this.logs(logger?.debug, message, ...optionalParams)
      console.debug('\x1b[2m%s\x1b[0m', new Date().toLocaleString(), '\t', message, ...optionalParams)
    } else {
      console.debug(new Date().toLocaleString(), '\t', message, ...optionalParams)
    }
  }
}
