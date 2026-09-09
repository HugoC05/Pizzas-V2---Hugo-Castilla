//Esta es la capa donde se persisten los datos

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let pizzas = [{ id: 1, nombre: "Hawaiina", descripcion: "Jamon y piña" }]
/**
 * Regresa una lista de las pizzas
 * @returns []
 */
export async function obtenerTodasLasPizzasAsync() {
    await sleep(2000)

    return  pizzas
}

/**
 * Regresa la pizza del id buscado o undefined si no lo encuentra
 * @param {*} id
 */
export async function obtenerPizzaPorIdAsync(id) {
    await sleep(1000)

    const pizza = pizzas.find(x => x.id == id)

    return pizza
}

export async function agregarPizzaAsync(pizza) {
    await sleep(1000)
    pizzas.push(pizza)
}

/**
 * Actualiza los datos de una pizza existente
 * @param {*} id
 * @param {*} pizzaActualizada
 * @returns la pizza actualizada o undefined si no existe
 */
export async function actualizarPizzaAsync(id, pizzaActualizada) {
    await sleep(1000)

    const index = pizzas.findIndex(x => x.id == id)

    if (index === -1) return undefined

    pizzas[index] = { ...pizzas[index], ...pizzaActualizada }

    return pizzas[index]
}

/**
 * Elimina una pizza por su id
 * @param {*} id
 * @returns true si se eliminó, false si no se encontró
 */
export async function borrarPizzaAsync(id) {
    await sleep(1000)

    const index = pizzas.findIndex(x => x.id == id)

    if (index === -1) return false

    pizzas.splice(index, 1)

    return true
}