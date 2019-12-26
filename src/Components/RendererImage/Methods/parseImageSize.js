export default function parseImageSize(v) {

  return isNaN(v) ? v : `${v}px`
  
}