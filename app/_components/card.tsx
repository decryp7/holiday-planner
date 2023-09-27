import React, {useEffect, useImperativeHandle, useRef, useState} from "react";
import _ from 'lodash';

const Card = React.memo(React.forwardRef((
    props : {children: any,
        header: string,
        headerSize: number,
        labelColor: string} , ref) =>{
    const [showListeners, setShowListeners] = useState<((header: string) => void)[]>([]);

    useImperativeHandle(ref, ()=>{
       return {
           show() { setStyle(showStyle); },
           hide() { setStyle(hideStyle); },
           onShow(callback: (header: string) => void) {
               setShowListeners(prev => [...prev, callback]);
           },
           get header() {return props.header},
       }
    });

    const showStyle = {
        transform: "translate(-50%, -100%)",
        zIndex: 0,
    }
    const hideStyle = {
        top: `calc(100% - ${props.headerSize}px)`,
        zIndex: 1,
    }
    const [style, setStyle] = useState<any>(hideStyle);
    const card = useRef<HTMLDivElement>(null);

    function toggleCard() {
        setStyle((prev: any) => {
                if(_.isEqual(prev, hideStyle)){
                    for(const listener of showListeners){
                        listener(props.header);
                    }
                    return showStyle;
                }
                return hideStyle;
        });
    }

    return <div style={style}
            className={`fixed lg:w-1/2 w-full lg:h-1/2 h-3/4 left-1/2 -translate-x-1/2 bg-white rounded-t-xl shadow-t-xl transition-transform ease-in-out duration-500 will-change-auto`} ref={card}>
            <div style={{background: `${props.labelColor}`}} className="absolute font-bold w-fit px-2 text-xl rounded-b mr-10 right-0">{props.header}</div>
            <button onClick={toggleCard} className="block ml-auto mr-auto mt-2 w-12 h-2 bg-gray-200 rounded-full m-0"></button>
            <div className="p-2 text-black">{props.children}</div>
        </div>

}));

Card.displayName = "Card";

export default Card;