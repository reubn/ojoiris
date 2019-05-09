import parseQRCode from '../../store/actions/parseQRCode'

export default ({videoRef, dispatch}) => () => {
  let qrScanner
  (async () => {
    const {default: QrScanner} = await import('../../QrScanner')

    qrScanner = new QrScanner(videoRef.current, result => parseQRCode(dispatch, result))

    qrScanner.start()
  })()

  return () => qrScanner.destroy()
}
