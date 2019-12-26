import ComponentBuilder from '../ComponentBuilder/ComponentBuilder'


class ComponentFactory {

  static copyJSON(raw) {
    return JSON.parse(JSON.stringify(raw))
  }

  create(reservation) {

    const info = {}
    reservation = ComponentFactory.copyJSON(reservation)
    
    for (let key in reservation) info[key] = reservation[key]
    return new ComponentBuilder(info).build()

  }

  createFromName(name) {
    return this.create({ name })
  }

}


export default ComponentFactory