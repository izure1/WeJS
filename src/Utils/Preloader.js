import whenDomReady from 'when-dom-ready'


class Preloader {

    /**
     * 
     * @param {Function} preload  Promise를 반환하는 함수입니다
     * @param  {...any} params  preload 함수를 실행할 때 넘길 매개변수입니다
     * @return {Promise}  프로미스를 반환합니다
     */
    static waitPreload(preload, ...params) {
        return new Promise((resolve, reject) => {
            preload(...params).then(resolve).catch(reject)
        })
    }

    /**
     * 
     * @param {Array<Function>} preloads  Promise를 반환하는 함수를 담은 배열입니다
     * @param  {...any} params  preloads 배열에 담긴 함수를 실행할 때 넘길 매개변수입니다
     * @returns {Promise}  프로미스를 반환합니다
     */
    static waitPreloads(preloads, ...params) {
        return new Promise((resolve, reject) => {
            const results = []
            for (const preload of preloads) {
                const result = Preloader.waitPreload(preload, ...params)
                results.push(result)
            }
            Promise.all(results).then(resolve).catch(reject)
        })
    }

    /**
     * 
     * @param {HTMLElement} el 
     * @returns {Promise}
     */
    static waitElement(el) {
        return whenDomReady(el)
    }
    
    /**
     * 
     * @param {Array<HTMLElement>} elements 
     * @returns {Promise}
     */
    static waitElements(elements) {
        return new Promise((resolve, reject) => {
            const promises = []
            for (const el of elements) {
                const promise = Preloader.waitElement(el)
                promises.push(promise)
            }
            Promise.all(promises).then(resolve).catch(reject)
        })
    }

}


export default Preloader