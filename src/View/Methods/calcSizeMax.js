function getBiggerNumber(a, b) {
  return a > b ? a : b
}

export default function calcSizeMax() {

  this.sizeMax = [
    getBiggerNumber(this.sizeSelf[0], this.sizeChild[0]),
    getBiggerNumber(this.sizeSelf[1], this.sizeChild[1]),
  ]
  this.$emit('onchangesize', this.sizeMax)
  this.body.emit('body-size-update', { size: this.sizeMax })

  this.translate()

}