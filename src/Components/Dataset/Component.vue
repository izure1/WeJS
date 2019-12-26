<script>
  export const RESERVATION = {
    name: 'dataset',
    add(p, v) {
      this[p] = v
      return v
    },
    get(p) {
      return this[p]
    },
    has(p) {
      return this.hasOwnProperty(p)
    },
  }

  export default {

  }
</script>