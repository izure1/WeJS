import {
  SVG
} from '@svgdotjs/svg.js'


export default function drawText() {

  const {
    content,
    color,
    borderWidth,
    borderColor,
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    textAlign,
    lineHeight,
  } = this.body.component.text


  if (this.draw) this.draw.remove()
  if (this.text) this.text.remove()

  this.draw = SVG().addTo(this.$el).addClass('text-svg')
  this.text = this.draw.text(content).font({
    size: fontSize,
    family: fontFamily,
    weight: fontWeight,
    style: fontStyle,
    anchor: textAlign,
    leading: lineHeight,
  })


  const {
    width,
    height,
    x,
    y,
  } = this.text.node.getBBox()

  this.text.dmove(-x, -y)
  this.text.children().forEach(tspan => tspan.attr({
    'fill': color,
    'stroke': borderColor,
    'stroke-width': borderWidth,
    'paint-order': 'stroke fill'
  }))

  this.textWidth = width
  this.textHeight = height

  this.draw.size(this.textWidth, this.textHeight)
  this.text.size(this.textWidth, this.textHeight)

}