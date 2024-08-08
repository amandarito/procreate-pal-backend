# Procreate-pal backend

🌈 APIs for converting Lospec, Coolors, and Colorhunt palettes into Procreate palettes (.swatches files).

This is in progress, not yet live.

## Supported Websites

Procreate pal currently supports palettes from these sites:

- coolors.co
- colorhunt.com
- lospec.com
  > current lospec limitation: palettes with more than 30 swatches will only contain the first 30 colors. working on a solution!

🌱 Let me know if you'd like another website to be included, and I'll see what I can do.

## API usage:

### /api/preview 🖼️

`/api/preview` returns an array of hex code strings, useful to preview the palette before converting.

`-> { "colors": ['123234', 'abbff4', '980a8c', ...] }`

| parameter | type   | description                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| link      | string | a link to a palette from one of the supported websites: see **example links** below |

### /api/convert 🎨

`api/convert` returns a procreate .swatches file as a Blob to be downloaded.

`-> {"palette": Blob }`

| parameter | type   | description                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| link      | string | a link to a palette from one of the supported websites: see **example links** below |

### Example Links

🍃 Here are some example links you may use to test the API.

To work, your link should match the formats shown here (depending on the palette, the latter part of the link will be different).

- colorhunt: https://colorhunt.co/palette/201e43134b70508c9beeeeee
- coolors: https://coolors.co/a30015-bd2d87-d664be-df99f0-b191ff
- lospec: https://lospec.com/palette-list/cc-29
