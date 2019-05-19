import store from '../store'

import calculateHMAC from './calculateHMAC'
import parseResponse from './parseResponse'

const timestampCheck = async (response, {parameters, key, id}, retry) => {
  if(!retry) return
  const text = await response.text()

  if(text.startsWith('Timestamp')) return makeRequest({timestamp: {offset: text.split(' ').pop() - Date.now()}, ...parameters}, {key, id}, false)
}

const makeRequest = async ({timestamp: {offset}={}, ...parameters}, {key, id}, retry=true) => {
  const url = new URL(`http://ojoiris-${id}.local/`)

  const query = new URLSearchParams(parameters)

  if(offset) query.append('timestamp', (Date.now() + offset) % 0xffffffff)

  const queryStringPreHMAC = query.toString()

  if(queryStringPreHMAC){
    const hmac = await calculateHMAC(key, queryStringPreHMAC)
    query.append('hmac', hmac)

    url.search = query
  }

  const response = await fetch(url)
  if(response.ok) return response

  return await timestampCheck(response, {parameters, key, id}, retry) || {ok: false}
}

export default makeRequest
