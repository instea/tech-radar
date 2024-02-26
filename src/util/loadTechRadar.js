const { google } = require('googleapis')
const fs = require('fs')

const credentials = require('../../instea-dev-b79e01fcea4d.json')

const sheetId = '193QZSj_Xajb0erG4031jOqBkGphUX3NJZ3aCl_1npWs'

function normalizeText(text) {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/\n/g, '<br>')
}

async function downloadSheetContent() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
    const sheetInstance = google.sheets({ version: 'v4', auth })

    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'A2:F',
    })

    console.log(infoObjectFromSheet.data.values)

    const data = []
    infoObjectFromSheet.data.values.forEach((blip) => {
      if (blip[0] && blip[1] && blip[2] && blip[3]) {
        data.push({
          name: blip[0],
          ring: blip[2],
          quadrant: blip[1],
          isNew: 'TRUE',
          description: normalizeText(blip[3]),
        })
      }
    })

    console.log(data)
    const outputFile = './instea-tech-radar.json'
    fs.writeFileSync(outputFile, JSON.stringify(data))
    console.log(`Wrote sheet data to '${outputFile}' -> ${data.length} blips`)
  } catch (err) {
    console.error('Error downloading sheet content:', err)
  }
}

downloadSheetContent()
