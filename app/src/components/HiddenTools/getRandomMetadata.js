import randomString from 'crypto-random-string'
import randomWords from 'random-words'

export default () => {
  // {id: '', key: '', password: '', mac: ''}
  const id = `${randomString({length: 2, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'})}${randomString({length: 2, characters: '0123456789'})}`
  const key = randomString({length: 64})
  const password = randomWords({exactly: 6, maxLength: 10}).join('-')
  const mac = ''

  return {id, key, password, mac}

}
