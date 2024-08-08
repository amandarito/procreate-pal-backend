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
    handler: coolorsToHex
  },
  {
    name: 'Color Hunt',
    pattern: /https:\/\/colorhunt.co\/palette\/.+/,
    handler: colorhuntToHex
  },
  {
    name: 'Lospec',
    pattern: /https:\/\/lospec.com\/palette-list\/.+/,
    handler: lospecToHex
  }
]

// retrieves conversion handler
export function getHandler (url) {
  for (const site of supportedWebsites) {
    if (site.pattern.test(url)) {
      return site.handler
    }
  }
  throw new Error('unsupported website or invalid URL')
}

export function validateUrl (url) {
  for (const site of supportedWebsites) {
    if (site.pattern.test(url)) {
      return true
    }
  }
  throw new Error('unsupported website or invalid URL')
}

export async function convert (sourceSite, sourceUrl) {
  switch (sourceSite) {
    case 'lospec':
      return await hexToProcreate(await lospecToHex(sourceUrl))
    case 'coolors':
      return await hexToProcreate(coolorsToHex(sourceUrl))
    case 'colorhunt':
      return await hexToProcreate(colorhuntToHex(sourceUrl))
    default:
      console.log('site not supported :(')
      return null
  }
}

export async function getHexCodes (sourceSite, sourceUrl) {
  switch (sourceSite) {
    case 'lospec':
      return await lospecToHex(sourceUrl)
    case 'coolors':
      return coolorsToHex(sourceUrl)
    case 'colorhunt':
      return colorhuntToHex(sourceUrl)
    default:
      console.log('site not supported :(')
      return null
  }
}

// xxx_to_hex (url) -> { "colors": [color, color, color, ...] }

async function lospecToHex (link) {
  console.log('lospec to hex')
  const response = await fetch(`${link}.json`)
  const json = await response.json()
  const hexCodes = await json.colors
  return hexCodes
}

function colorhuntToHex (link) {
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

function coolorsToHex (link) {
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

function hexToRgb (hex) {
  return [
    ('0x' + hex[0] + hex[1]) | 0,
    ('0x' + hex[2] + hex[3]) | 0,
    ('0x' + hex[4] + hex[5]) | 0
  ]
}

// -> Promise<Blob>
export async function hexToProcreate (colors) {
  console.log('hex to procreate')
  let formattedRgbColors = colors.map(x => [hexToRgb(x), 'rgb'])
  let paletteBlob = await createSwatchesFile(
    'test palette',
    formattedRgbColors,
    'Blob'
  )
  return paletteBlob
  // return createSwatchesFile('test palette', formattedRgbColors, 'Blob')
}
