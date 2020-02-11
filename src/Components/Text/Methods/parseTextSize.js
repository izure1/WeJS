export default function parseTextSize(v) {

  return isNaN(v) ? v : `${v}px`
  
}