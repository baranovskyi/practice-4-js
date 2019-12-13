export default class EnhancedPromise extends Promise {
    static some(promises, count) {
        const rejects = promises.length - count;
        const errors = [];
        const result = [];

        if (count > promises.length) {
            return EnhancedPromise.reject(new Error())
        }
        
         if (promises.length === 0) {
             return EnhancedPromise.resolve(result)
         }
         
        const enhancedPromise = new EnhancedPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(
                    data => {
                        result.push(data);
                        if (result.length >= count) {
                            resolve(result);
                        }
                    }).catch(
                        error => {
                            errors.push(error);
                            if (errors.length >= rejects) {
                                reject(new Error());
                            }
                        })

            });
        });

        return enhancedPromise;
    }
}