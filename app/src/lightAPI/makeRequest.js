import store from '../store'

import calculateHMAC from './calculateHMAC'
import parseResponse from './parseResponse'

export default async ({timestamp: {offset}={}, ...parameters}, {key, id}) => {
  console.log(parameters, offset)
  const url = new URL(`http://ojoiris-${id}.local/`)

  const query = new URLSearchParams(parameters)

  if(offset) query.append('timestamp', (Date.now() + offset) % 0xffffffff)

  const queryStringPreHMAC = query.toString()

  if(queryStringPreHMAC){
    const hmac = await calculateHMAC(key, queryStringPreHMAC)
    query.append('hmac', hmac)

    url.search = query
  }

  return fetch(url)
}
