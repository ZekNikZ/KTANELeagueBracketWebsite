import { useEffect } from 'react';

export default function useAsync<T>(
    asyncFn: () => Promise<T>,
    onSuccess: (data: T) => void
): void {
    useEffect(() => {
        let isMounted = true;
        asyncFn().then((data) => {
            if (isMounted) {
                onSuccess(data);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [asyncFn, onSuccess]);
}
