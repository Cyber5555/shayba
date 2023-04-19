import React, {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./slider.module.css";

const Carousel = ({ children }) => {
  const containerRef = useRef();
  const [targetClick, setTargetClick] = useState(0);
  const [accept, setAccept] = useState(false);
  const intervalRef = useRef(null);
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);

  const actionHandler = useCallback(
    (mode) => {
      containerRef.current.style.transitionDuration = "400ms";
      if (mode === "prev") {
        if (current <= 1) {
          setTranslateX(0);
          setCurrent(children.length);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current - 1));
          setCurrent((prev) => --prev);
        }
      } else if (mode === "next") {
        if (current >= children.length) {
          setTranslateX(
            containerRef.current.clientWidth * (children.length + 1)
          );
          setCurrent(1);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current + 1));
          setCurrent((prev) => ++prev);
        }
      }
    },
    [current, children]
  );

  useEffect(() => {
    const transitionEnd = () => {
      if (current <= 1) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * current);
      }
      if (current >= children.length) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * children.length);
      }
    };

    document.addEventListener("transitionend", transitionEnd);

    return () => {
      document.removeEventListener("transitionend", transitionEnd);
    };
  }, [current, children]);

  // useEffect(() => {
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //   }
  //   intervalRef.current = setInterval(() => {
  //     actionHandler("next");
  //   }, 3000);
  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, [actionHandler]);

  const toucheHandler = (e) => {
    if (e.targetTouches[0].clientX < targetClick) {
      if (accept) {
        actionHandler("next");
        return setAccept(false);
      }
    } else if (e.targetTouches[0].clientX > targetClick) {
      if (accept) {
        actionHandler("prev");
        return setAccept(false);
      }
    }
  };

  const slides = useMemo(() => {
    if (children.length > 1) {
      let items = Children.map(children, (child, index) => (
        <li key={index} className={styles.Slide}>
          {child}
        </li>
      ));

      return [
        <li key={children.length + 1} className={styles.Slide}>
          {children[children.length - 1]}
        </li>,
        ...items,
        <li key={children.length + 2} className={styles.Slide}>
          {children[0]}
        </li>,
      ];
    }
    return (
      <li key={children.length + 2} className={styles.Slide}>
        {children[0]}
      </li>
    );
  });

  useLayoutEffect(() => {
    setTranslateX(containerRef.current.clientWidth * current);
  }, []);

  return (
    <section className={styles.Root}>
      <ul
        ref={containerRef}
        className={styles.Container}
        style={{
          transform: `translateX(${-translateX}px)`,
        }}
        onTouchStart={(e) => setTargetClick(e.targetTouches[0].clientX)}
        onTouchMove={toucheHandler}
        onTouchEnd={() => setAccept(true)}
      >
        {slides}
      </ul>

      <div className={styles.CheckedIndexSliderParent}>
        {children.map((item, index) => (
          <input
            type="checkbox"
            key={index}
            className={styles.CheckboxSlider}
            checked={current === index + 1 ? true : false}
            onChange={() => {
              let new_index = index + 1;
              actionHandler(new_index);
              setCurrent(new_index);
              setTranslateX(containerRef.current.clientWidth * new_index);
            }}
          />
        ))}
      </div>
      {/* <button
        onClick={() => actionHandler("prev")}
        className={`${styles.Btn} ${styles.BtnLeft}`}
        >
        {"<"}
        </button>
        <button
        onClick={() => actionHandler("next")}
        className={`${styles.Btn} ${styles.BtnRight}`}
        >
        {">"}
      </button> */}
    </section>
  );
};
export default Carousel;
