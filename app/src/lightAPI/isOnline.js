import makeRequest from './makeRequest'

export default async ({id}) => {
  const request = makeRequest({}, {id}).catch(() => ({ok: false}))
  const timeout = new Promise(r => setTimeout(r, 2000)).then(() => ({ok: false}))

  const {ok} = await Promise.race([request, timeout])

  return ok
}
