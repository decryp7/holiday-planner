import React, {useRef, useState} from "react";

const reservedSpace = "120px";
const hideClass = `-translate-y-[calc(100%-${reservedSpace})]`;

const SearchCard = React.memo((props, context) =>{
    const [show, setShow] = useState<boolean>(false);
    const card = useRef<HTMLDivElement>(null);

    function toggleCard() {
        setShow(show => {
            if(card.current != null) {
                if (show) {
                    card.current.classList.remove(hideClass);
                } else {
                    card.current.classList.add(hideClass);
                }
            }
            return !show
        });
    }

    return <div className="absolute flex left-0 top-0 justify-center w-screen h-screen overflow-hidden">
        <div className={`absolute top-[calc(100%-${reservedSpace})] lg:w-2/3 w-3/4 h-3/4 bg-white p-2 rounded-t-xl shadow-xl transition-transform ease-in-out duration-200 will-change-auto`} ref={card}>
            <button onClick={toggleCard} className="bg-amber-300">Toggle Card</button>
        </div>
    </div>
});

SearchCard.displayName = "SearchCard";

export default SearchCard;