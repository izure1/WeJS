import ComponentBuilder from '../ComponentBuilder/ComponentBuilder'


class ComponentFactory {

  create(reservation) {
    return new ComponentBuilder(reservation).build()
  }

  createFromName(name) {
    return this.create(() => ({
      name
    }))
  }

}


export default ComponentFactory