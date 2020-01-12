import Asset from '../../Asset/Asset'


export default function getBuffer(uri, mime = 'application/octet-stream') {

  return new Promise((resolve, reject) => {

    const xml = new XMLHttpRequest
    xml.open('GET', uri)
    xml.onload = () => {

      if (xml.status !== 200) reject()
      else {
        const blob = new Blob([xml.response], { type: mime })
        const asset = new Asset(blob, mime)
        resolve([uri, asset])
      }

    }
    xml.onabort = reject
    xml.onerror = reject
    xml.responseType = 'blob'
    xml.send(null)

  })

}