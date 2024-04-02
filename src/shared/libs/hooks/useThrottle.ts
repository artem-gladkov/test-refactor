import {useCallback, useEffect, useRef} from "react";

export function useThrottle<T extends unknown[]>(
    fn: (...args: T) => void,
    delay: number,
): [(...args: T) => void, () => void] {
    const isThrottled = useRef(false)
    const timeout = useRef<NodeJS.Timeout>();
    const lastParams = useRef<T>();
    const isNeedLastCall = useRef(false)

    const fnRef = useRef(fn);

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    useEffect(() => {
        return () => {
            clear()
        }
    }, []);

    const throttledFn = useCallback(
        (...params: T) => {
            if (isThrottled.current) {
                lastParams.current = params
                isNeedLastCall.current = true

                return
            }

            isThrottled.current = true
            fnRef.current(...params);

            timeout.current = setTimeout(() => {
                isThrottled.current = false

                clearTimeout(timeout.current)
                timeout.current = undefined;

                if (isNeedLastCall.current) {
                    throttledFn(...lastParams.current as T)

                    lastParams.current = undefined
                    isNeedLastCall.current = false
                }

            }, delay);

        },
        [delay],
    );

    const clear = useCallback(() => {
        clearTimeout(timeout.current);
        timeout.current = undefined;
    }, []);

    return [throttledFn, clear];
}