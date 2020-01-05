import ComponentBuilder from '../ComponentBuilder/ComponentBuilder'


class ComponentFactory {

  create(Reservation) {
    const data = new Reservation
    const builder = new ComponentBuilder
    return builder.setName(data.name).setCache(data).build()
  }

  createFromName(name) {
    return this.create(() => ({
      name
    }))
  }

}


export default ComponentFactory