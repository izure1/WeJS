import screenfull from 'screenfull'


export default function exitFullscreen() {
  if (screenfull.isFullscreen) screenfull.exit()
}