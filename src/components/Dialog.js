import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Html } from "@react-three/drei";
import { useCity } from "../context/CityContext";

const Dialog = forwardRef((props, ref) => {
  // Typing animation in the dialog
  const dialogRef = useRef();

  // Clicking blue car state
  const { isCarDialogOpen } = useCity();

  // Adding state to content
  // const [content, setContent] = useState(null);

  // Create typewriting effect
  const [displayedContent, setDisplayedContent] = useState("");
  const [index, setIndex] = useState(0);
  const speed = 100;

  /**
   * Steps
   *
   * 1. If isCardialog is true, set content state to props.text, if isCardialog is false, set content state to null
   * 2. Start animating
   */

  useEffect(() => {
    // step 1
    if (isCarDialogOpen) {
      /*Create a new setInterval and store its id*/
      const animKey = setInterval(() => {
        setIndex((index) => {
          /*This setState function will set the index
        to index+1 if there is more content otherwise
        it will destory this animation*/
          if (index >= props.text.length - 1) {
            clearInterval(animKey);
            return index;
          }
          return index + 1;
        });
      }, speed);
      setDisplayedContent(
        (displayedContent) => displayedContent + props.text[index]
      );
    } else {
      setDisplayedContent("");
    }
  }, [isCarDialogOpen, props, index]);

  // useEffect(() => {
  //   // step 2
  //   if (content) {
  //     gsap.to("dialog-span", {
  //       duration: 1,
  //       rotation: 360,
  //       y: 100,
  //       stagger: 0.5,
  //     });
  //   }
  // }, [content]);

  return (
    <group position={[10, 10, 10]} scale={[2]}>
      <Html
        className="dialog-content"
        style={{
          display: isCarDialogOpen ? "block" : "none",
        }}
        calculatePosition={(_, camera, size) => [
          size.width / 2,
          size.height / 2,
        ]} // Override default positioning function. (default=undefined) [ignored in transform mode]
        ref={ref}
        center
        occlude
      >
        <div className="dialog-wrapper">
          <p className="dialog-anim" ref={dialogRef}>
            <span className="dialog-span">{displayedContent}</span>
          </p>
        </div>
      </Html>
    </group>
  );
});

export default Dialog;
