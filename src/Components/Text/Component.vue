<template>
    <div :style="{
        width: parseTextSize(body.component.text.width),
        height: parseTextSize(body.component.text.height),
        fontSize: parseTextSize(body.component.text.fontSize),
        fontFamily: body.component.text.fontFamily,
        fontWeight: body.component.text.fontWeight,
        fontStyle: body.component.text.fontStyle,
        color: body.component.text.color,
        textAlign: body.component.text.textAlign,
        lineHeight: body.component.text.lineHeight,
        textStroke: `${body.component.text.fontSize / 20}px ${body.component.text.borderColor}`,
        letterSpacing: `${body.component.text.letterSpacing}px`,
        wordSpacing: `${body.component.text.wordSpacing}px`,
    }">{{ body.component.text.content }}</div>
</template>

<script>
import Component from '../../View/Component/Component'
import parseTextSize from './Methods/parseTextSize'


export class Reservation extends Component {

    name = 'text'
    width = 'auto'
    height = 'auto'
    fontSize = 30
    fontWeight = 600
    lineHeight = 1
    letterSpacing = 0
    wordSpacing = 0
    content = ''
    textAlign = 'left'
    fontFamily = 'arial'
    fontStyle = 'normal'
    borderColor = 'transparent'
    color = 'black'

    constructor(...args) {
        super(...args)
    }
}

export default {
    props: ['body'],
    methods: {
        parseTextSize
    },
}
</script>