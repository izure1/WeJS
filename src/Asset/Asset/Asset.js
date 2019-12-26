class Asset {

  constructor(blob) {
    this._blob = blob
    this._uri = URL.createObjectURL(this._blob)
  }

  get uri() { return this._uri }
  get blob() { return this._blob }

}


export default Asset