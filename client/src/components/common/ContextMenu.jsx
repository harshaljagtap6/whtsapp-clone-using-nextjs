import React, { useEffect, useRef } from "react";

function ContextMenu({ options, cordinates, ContextMenu, setContextMenu }) {
    const contextMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.id !== "contextmenu") {
                if (
                    contextMenuRef.current &&
                    !contextMenuRef.current.contains(event.target)
                ) {
                    setContextMenu(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleClick = (e, callback) => {
        e.stopPropagation();
        setContextMenu(false);
        callback();
    };
    return (
        <div
            className={`bg-dropdown-background fixed py-2 z-[100] shadow-xl`}
            ref={contextMenuRef}
            style={{
                top: `${cordinates.y}px`,
                left: `${cordinates.x}px`,
            }}
        >
            <ul>
                {options.map(({ name, callback }) => (
                    <li
                        key={name}
                        onClick={(e) => handleClick(e, callback)}
                        className="px-4 py-2 hover:bg-panel-header-background cursor-pointer"
                    >
                        <span className="text-white">{name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContextMenu;
