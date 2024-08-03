import { createSwatchesFile } from 'procreate-swatches'

const sampleCoolorsLink =
  'https://coolors.co/caffd0-c9e4e7-b4a0e5-ca3cff-1e1014'
let sampleColorhuntLink =
  'https://colorhunt.co/palette/f6fb7ab4e38088d66c73bba3'
let sampleLospecLink = 'https://lospec.com/palette-list/technogarten'

const supportedWebsites = [
  {
    name: 'Coolors',
    pattern: /https:\/\/coolors.co\/.+/,
    handler: coolors_to_hex
  },
  {
    name: 'Color Hunt',
    pattern: /https:\/\/colorhunt.co\/palette\/.+/,
    handler: colorhunt_to_hex
  },
  {
    name: 'Lospec',
    pattern: /https:\/\/lospec.com\/palette-list\/.+/,
    handler: lospec_to_hex
  }
]

// [x] create dispatcher function for conveter handlers
export function getHandler (url) {
  for (const site of supportedWebsites) {
    if (site.pattern.test(url)) {
      return site.handler
    }
  }
  throw new Error('unsupported website or invalid URL')
}

// [x]: validate URLs automatically
export function validateUrl (url) {
  for (const site of supportedWebsites) {
    if (site.pattern.test(url)) {
      return true
    }
  }
  return new Error('unsupported website or invalid URL')
}

export async function convert (sourceSite, sourceUrl) {
  switch (sourceSite) {
    case 'lospec':
      return await hex_to_procreate(await lospec_to_hex(sourceUrl))
    case 'coolors':
      return await hex_to_procreate(coolors_to_hex(sourceUrl))
    case 'colorhunt':
      return await hex_to_procreate(colorhunt_to_hex(sourceUrl))
    default:
      console.log('site not supported :(')
      return null
  }
}

export async function getHexCodes (sourceSite, sourceUrl) {
  switch (sourceSite) {
    case 'lospec':
      return await lospec_to_hex(sourceUrl)
    case 'coolors':
      return coolors_to_hex(sourceUrl)
    case 'colorhunt':
      return colorhunt_to_hex(sourceUrl)
    default:
      console.log('site not supported :(')
      return null
  }
}

// [x] does it make sense for each to have a separate function? yes.
async function lospec_to_hex (link) {
  console.log('lospec to hex')
  const response = await fetch(`${link}.json`)
  const json = await response.json()
  const colors = await json.colors
  return colors
}

function colorhunt_to_hex (link) {
  console.log('colorhunt to hex')
  let hexCodes = []
  let baseIndex = colorhuntBase.length
  // basic link validation
  if (link.substr(0, colorhuntBase.length) == colorhuntBase) {
    let hexCode = link.substr(baseIndex, 6)
    while (hexCode.length == 6) {
      hexCodes.push(hexCode)
      baseIndex += 6
      hexCode = link.substr(baseIndex, 6)
    }
    return hexCodes
  }
  return null
}

function coolors_to_hex (link) {
  console.log('coolors to hex')
  let hexCodes = []
  let baseIndex = coolorsBase.length
  // basic link validation
  if (link.substr(0, coolorsBase.length) == coolorsBase) {
    let hexCode = link.substr(baseIndex, 6)
    while (hexCode.length == 6) {
      hexCodes.push(hexCode)
      baseIndex += 7
      hexCode = link.substr(baseIndex, 6)
    }
    return hexCodes
  }
  return null
}

function hex_to_rgb (hex) {
  return [
    ('0x' + hex[0] + hex[1]) | 0,
    ('0x' + hex[2] + hex[3]) | 0,
    ('0x' + hex[4] + hex[5]) | 0
  ]
}

function hex_to_procreate (hexCodes) {
  console.log('hex to procreate')
  let formatted_rgb_colors = hexCodes.map(x => [hex_to_rgb(x), 'rgb'])
  return createSwatchesFile('test palette', formatted_rgb_colors, 'Blob')
}