import React, {useRef, useState} from "react";

const Card = React.memo((props : {children: any} , context) =>{
    const hideClass = `-translate-y-[calc(100%-120px)]`;
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

    return <div className={`absolute block top-[calc(100%-120px)] lg:w-1/4 w-3/4 h-3/4 left-1/2 -translate-x-1/2 bg-white p-2 rounded-t-xl shadow-xl transition-transform ease-in-out duration-200 will-change-auto`} ref={card}>
            <button onClick={toggleCard} className="block ml-auto mr-auto w-1/4 h-2 bg-gray-100 rounded-full m-0"></button>
            <div className="p-2 text-black">{props.children}</div>
        </div>

});

Card.displayName = "Card";

export default Card;