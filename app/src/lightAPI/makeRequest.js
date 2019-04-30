import store from '../store'

import calculateHMAC from './calculateHMAC'
import parseResponse from './parseResponse'

export default async (parameters, {key, id}) => {
  const url = new URL(`http://ojoiris-${id}.local/`)

  const query = new URLSearchParams(parameters)
  const queryStringPreHMAC = query.toString()

  if(queryStringPreHMAC){
    const hmac = await calculateHMAC(key, queryStringPreHMAC)
    query.append('hmac', hmac)

    url.search = query
  }

  return fetch(url)
}
