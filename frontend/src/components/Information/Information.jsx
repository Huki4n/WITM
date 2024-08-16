import { memo, useEffect, useRef } from "react";

const Information = memo(({ children, setMargin }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const handleResize = () => {
        const style = getComputedStyle(elementRef.current);
        setMargin(style.marginLeft);
      };
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [setMargin]);

  return (
    <div
      ref={elementRef}
      id="wrapper"
      className={
        "max-w-[1720px] mx-auto grid grid-cols-[auto_minmax(auto,980px)] grid-rows-[275px_142px_219px_319px] gap-y-10 relative z-[3]"
      }
    >
      {children}
    </div>
  );
});

export default Information;
