function Pairs(...inits) {

    const pairs = [...inits]
    const seal = (target, property, value) => {
        Object.defineProperty(target, property, { value })
    }


    const add = function (...key) {

        const keys = new Set([...key])
        const lists = new Set
        const prevPair = new Set

        // 새로 받은 key를 보유하고 있는 모든 페어 배열을 받아와 lists 변수에 담습니다.
        for (const key of keys) {
            for (const pair of pairs) {
                if (pair.indexOf(key) !== -1) lists.add(pair)
            }
        }
        // lists 변수에 담긴 페어 배열을 pairs 배열에서 삭제합니다.
        // 이후 삭제된 pair 배열의 내용물을 prevPair 변수에 담습니다.
        for (const pair of lists) {
            let i = pairs.length
            while (i--) {
                if (pairs[i] === pair) {
                    pairs.splice(i, 1)
                    for (const key of pair) prevPair.add(key)
                }
            }
        }

        // 새로운 페어배열을 만듭니다.
        // 이 배열에는 이전에 prevPair에 있던 모든 내용을 중복없이 하나로 합쳤습니다.
        const newPair = Array.from(
            Array.from(keys).reduce((prevPair, key) => prevPair.add(key), prevPair)
        )

        pairs.push(newPair)
        return newPair
    }

    const all = function (u) {
        const lists = []
        for (const pair of pairs) lists.push(...pair)
        return Array.from(new Set(lists))
    }

    const has = function (u) {
        return !!get(u)
    }

    const _delete = function (u) {
        const t = get(u)
        if (!t) return null
        else {
            const i = t.indexOf(u)
            t.splice(i, 1)
            return t
        }
    }

    const drop = function (u) {
        let i = pairs.length
        while (i--) {
            if (pairs[i].indexOf(u) !== -1) pairs.splice(i, 1)
        }
    }

    const clear = function () {
        pairs.splice(0, pairs.length)
    }

    const get = function (u) {
        for (const pair of pairs) {
            if (pair.indexOf(u) === -1) continue
            return pair
        }
        return []
    }

    const AND = function (...list) {
        const result = new Set
        for (const u of [...list]) {
            const keys = get(u)
            if (keys.length) 
                for (const key of keys) result.add(key)
            else {
                result.clear()
                break
            }
        }
        return Array.from(result)
    }

    const OR = function (...list) {
        const result = new Set
        for (const u of [...list]) {
            const keys = get(u)
            for (const key of keys) result.add(key)
        }
        return Array.from(result)
    }

    seal(pairs, 'all', all)
    seal(pairs, 'add', add)
    seal(pairs, 'has', has)
    seal(pairs, 'AND', AND)
    seal(pairs, 'OR', OR)
    seal(pairs, 'delete', _delete)
    seal(pairs, 'drop', drop)
    seal(pairs, 'clear', clear)

    return pairs

}


export default Pairs