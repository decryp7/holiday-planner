import React from "react";
import {ArchiveBoxArrowDownIcon, ArchiveBoxIcon} from "@heroicons/react/24/outline";
import {useRecoilState} from "recoil";
import {cardGroupVisibleState} from "@/app/_state/cardGroupVisibleState";

const ToggleCardsButton = React.memo((props , context) =>{
    const [cardGroupVisible, setCardGroupVisible] = useRecoilState(cardGroupVisibleState);

    function toggleVisibility() {
        setCardGroupVisible(prev => {
            return !prev;
        })
    }

    return <button className="p-1 w-[40px] h-[40px] bg-white shadow rounded-[2px]"
                onClick={toggleVisibility}>
            {cardGroupVisible ?
                <ArchiveBoxArrowDownIcon className="w-auto h-auto stroke-2" />
                : <ArchiveBoxIcon className="w-auto h-auto stroke-2" />
            }
        </button>;
});

ToggleCardsButton.displayName = "ToggleCardsButton";

export default ToggleCardsButton;