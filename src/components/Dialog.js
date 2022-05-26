import React, { forwardRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useCity } from "../context/CityContext";
import { useCityUpdate } from "../context/CityContext";
import { useSpring, easings } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { IoIosClose } from "react-icons/io";

const Dialog = forwardRef((props, ref) => {
  // Clicking blue car state
  const { isCarDialogOpen } = useCity();

  const { toggleClickedCity, toggleCarDialog } = useCityUpdate();

  // Adding state to content
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [header, setHeader] = useState(null);

  // Add state to close button
  const [hoverCloseBtn, setHoverCloseBtn] = useState(false);

  /**
   * Steps
   *
   * 1. If isCardialog is true, set timeout then set content state to props.text, if isCardialog is false, set content state to null
   * 2. Start animating
   */

  useEffect(() => {
    // step 1
    if (isCarDialogOpen) {
      /*Create a new setInterval and store its id*/
      setTimeout(() => {
        setHeader(props.header);
        setTitle(props.title);
        setContent(props.text);
      }, 100);
    } else {
      setHeader("");
      setTitle("");
      setContent("");
    }
  }, [isCarDialogOpen, props]);

  useEffect(() => {
    // step 2
    if (content) {
      gsap.fromTo(
        ".dialog-anim",
        {
          y: 20,
          opacity: 0,
        },
        {
          delay: 0.5,
          y: 0,
          duration: 0.8,
          opacity: 1,
          stagger: 0.2,
          ease: "power3.out",
          clearProps: "all",
        }
      );
    }
  }, [content]);

  // Default spring animation properties
  const [{ o }] = useSpring(
    {
      o: Number(isCarDialogOpen),
      config: {
        mass: 1,
        tension: 120,
        friction: 14,
        easing: easings.easeInOutQuart,
      }
    },
    [isCarDialogOpen]
  );

  // Default spring animation properties
  const [{ v }] = useSpring(
    {
      v: Number(hoverCloseBtn),
      config: {
        mass: 1,
        tension: 120,
        friction: 14,
      }
    },
    [hoverCloseBtn]
  );

  // Interpolations
  const dialogHeight = o.to([0, 1], ["0rem", "20rem"]);
  const dialogPadding = o.to([0, 1], ["0rem 0rem", "1.5rem 2rem"]);
  const dialogOpacity = o.to([0, 1], ["0%", "100%"]);
  const dialogCloseBtnBg = v.to([0, 1], ["#FFFFFF", "#f3f3f3"]);
  const dialogCloseBtnSize = v.to([0, 1], ["1.5rem", "1.8rem"]);

  return (
    <group position={[10, 10, 10]}>
      <Html
        calculatePosition={(el, camera, size) => [
          size.width - size.width / 3,
          size.height / 2,
        ]} // Override default positioning function. (default=undefined) [ignored in transform mode]
        ref={ref}
        center
        occlude
      >
        <animated.div
          className="dialog-content"
          style={{
            minHeight: dialogHeight,
            padding: dialogPadding,
            opacity: dialogOpacity,
          }}
        >
          <animated.div
            className="dialog-close-btn"
            onPointerEnter={() => setHoverCloseBtn(true)}
            onPointerLeave={() => setHoverCloseBtn(false)}
            onClick={() => {
              toggleClickedCity();
              toggleCarDialog()
            }}
            style={{
              backgroundColor: dialogCloseBtnBg,
            }}
          >
            <animated.p
              style={{
                fontSize: dialogCloseBtnSize,
              }}
            >
              <IoIosClose />
            </animated.p>
          </animated.div>
          <div className="dialog-wrapper">
            <p className="dialog-anim dialog-header">{header}</p>
            <h2 className="dialog-anim">{title}</h2>
            <p className="dialog-anim">{content}</p>
            <button className="btn-dialog dialog-anim"><p className="dialog-anim">Next</p></button>
          </div>
        </animated.div>
      </Html>
    </group>
  );
});

export default Dialog;
