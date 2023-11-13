import { useRef, useLayoutEffect, useCallback } from 'react';

const useEvent = (handler: () => void) => {
  const handlerRef = useRef<any>(null);

  // DOM更新之后，视图渲染完成后之前更新`handlerRef.current`指向
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  // 用useCallback包裹，使得render时返回的函数引用一致
  return useCallback((...args) => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
};

export default useEvent;
