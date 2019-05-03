import makeRequest from './makeRequest'

export default async ({id}) => {
  const request = makeRequest({}, {id}).catch(() => ({ok: false}))
  const timeout = new Promise(r => setTimeout(r, 3000)).then(() => ({ok: false}))

  const fastest = await Promise.race([request, timeout])

  return fastest.ok ? fastest : null
}
