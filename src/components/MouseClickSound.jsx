import { useEffect } from "react";
import leftClick from "../../public/SoundEffects/LeftClick.mp3";
import rightClick from "../../public/SoundEffects/RightClick.mp3";

export default function MouseClickSounds() {
    useEffect(() => {
        const leftClickSound = new Audio(leftClick); // use imported variable
        const rightClickSound = new Audio(rightClick);

        const handleMouseDown = (e) => {
            if (e.button === 0) {
                leftClickSound.currentTime = 0;
                leftClickSound.play();
            } else if (e.button === 2) {
                rightClickSound.currentTime = 0;
                rightClickSound.play();
            }
        };

        const preventRightClickMenu = (e) => e.preventDefault();

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("contextmenu", preventRightClickMenu);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("contextmenu", preventRightClickMenu);
        };
    }, []);

    return null;
}
