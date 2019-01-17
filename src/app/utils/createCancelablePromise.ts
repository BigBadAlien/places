
export interface CancelablePromise<T> {
    promise: Promise<T>;
    cancel: () => void;
}

export function createCancelablePromise<T>(promise: Promise<T>) {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise<T>((resolve, reject) => {
        promise.then((val) =>
            hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
        ).catch(() => {});
        promise.catch((error) =>
            hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        ).catch(() => {});
    });

    wrappedPromise.catch(() => {});

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
}
