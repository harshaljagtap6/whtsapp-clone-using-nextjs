import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

function SearchBar() {
    return (
        <div className="bg-search-input-container-background flex py-3 pl-5 items-center g-3 h-14">
            <div className="bg-panel-header-background rounded-lg flex grow items-center gap-5 px-3 py-1">
                <div>
                    <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-sm" />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        className="bg-transparent text-sm focus:outline-none w-full text-white"
                    />
                </div>
            </div>
            <div className="pr-5 pl-3 ">
                <BsFilter className="text-panel-header-icon cursor-pointer text-xl" />
            </div>
        </div>
    );
}

export default SearchBar;
