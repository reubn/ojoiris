import randomString from 'crypto-random-string'
import randomWords from 'random-words'

function randomMac() {
  // Randomly assign a VM vendor's MAC address prefix, which should
  // decrease chance of colliding with existing device's addresses.

  const vendors = [
    [0x00, 0x05, 0x69], // VMware
    [0x00, 0x50, 0x56], // VMware
    [0x00, 0x0C, 0x29], // VMware
    [0x00, 0x16, 0x3E], // Xen
    [0x00, 0x03, 0xFF], // Microsoft Hyper-V, Virtual Server, Virtual PC
    [0x00, 0x1C, 0x42], // Parallels
    [0x00, 0x0F, 0x4B], // Virtual Iron 4
    [0x08, 0x00, 0x27] // Sun Virtual Box
  ]

  const [A,B,C] = vendors[Math.floor(Math.random() * (vendors.length - 1))]

  return [A, B, C, Math.floor(Math.random() * (0x7f + 1)), Math.floor(Math.random() * (0xff + 1)), Math.floor(Math.random() * (0xff + 1))]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()

}


export default ({id, key, password, mac}) => {
  // {id: '', key: '', password: '', mac: ''}
  const idNew = id || `${randomString({length: 2, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'})}${randomString({length: 2, characters: '0123456789'})}`
  const keyNew = key || randomString({length: 64})
  const passwordNew = password || randomWords({exactly: 6, maxLength: 10}).join('-')
  const macNew = mac || randomMac()

  return {id: idNew, key: keyNew, password: passwordNew, mac: macNew}

}
