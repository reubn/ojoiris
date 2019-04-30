import HmacSHA256 from 'crypto-js/hmac-sha256'

// const hexMap = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

export default async (key, message) => {
  // const encoding = {name: "HMAC", hash: "SHA-256"}
  //
  // const messageBuffer = new TextEncoder().encode(message)
  // const keyBuffer = new TextEncoder().encode(key)
  // const cryptoKey = await window.crypto.subtle.importKey("raw", keyBuffer, encoding, true, ['sign'])
  //
  // const HMACBuffer = await window.crypto.subtle.sign(encoding, cryptoKey, messageBuffer)
  // const HMACUint8Array = new Uint8Array(HMACBuffer)
  //
  // const hexString = [...HMACUint8Array].map(uInt8 => `${hexMap[(uInt8 & 0xF0) >> 4]}${hexMap[uInt8 & 0x0F]}`).join('')
  //
  // return hexString

  return HmacSHA256(message, key)
}
