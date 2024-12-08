import React from "react";

function Input({ name, state, setState, lablel = false }) {
    return (
        <div className="flex gap-1 flex-col">
            {lablel && (
                <label htmlFor={name} className="text-teal-light text-lg px-1">
                    {name}
                </label>
            )}
            <div>
                <input
                    type="text"
                    name={name}
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    className="bg-input-background text-sm focus:outline-none rounded-lg p-5 w-full"
                />
            </div>
        </div>
    );
}

export default Input;
