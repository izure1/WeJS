class Asset {

  constructor(blob, mime) {
    this._blob = blob
    this._uri = URL.createObjectURL(this._blob)
    this._mime = mime
  }

  get uri() { return this._uri }
  get blob() { return this._blob }
  get mime() { return this._mime }

}


export default Asset