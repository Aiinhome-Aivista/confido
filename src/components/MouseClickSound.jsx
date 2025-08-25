import { useEffect } from "react";
import leftClick from "../../public/SoundEffects/LeftClick.mp3";

export default function MouseClickSounds() {
    useEffect(() => {
        const leftClickSound = new Audio(leftClick);

        const handleMouseDown = (e) => {
            if (e.button === 0) {
                leftClickSound.currentTime = 0;
                leftClickSound.play();
            }
        };
        window.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);

        };
    }, []);

    return null;
}
