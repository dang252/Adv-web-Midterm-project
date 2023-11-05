import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = title;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
