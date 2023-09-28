import React, {ComponentType, useEffect, useImperativeHandle, useRef, useState} from "react";
import _ from 'lodash';
import {useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";

export interface CardInfo {
    header: string;
    labelColor: string;
    items?: any[];
}

const Card = React.memo(React.forwardRef((
    props : {items: any,
        header: string,
        headerSize: number,
        coveredSize?: number,
        labelColor: string} , ref) =>{
    const [showListeners, setShowListeners] = useState<((header: string) => void)[]>([]);
    const setActiveCard = useSetRecoilState(activeCardState);

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
        maxHeight: "100%",
        zIndex: 0,
    }
    const hideStyle = {
        maxHeight: `${props.headerSize}px`,
        zIndex: 1,
    }
    const [style, setStyle] = useState<any>(hideStyle);
    const card = useRef<HTMLDivElement>(null);
    const cardContent = useRef<HTMLDivElement>(null);

    function toggleCard() {
        if(_.isEqual(style, hideStyle)){
            for(const listener of showListeners){
                listener(props.header);
            }
            setActiveCard(props.header);
            setStyle(showStyle);
        }else{
            setActiveCard("");
            setStyle(hideStyle);
        }
    }

    return <div style={style}
            className="absolute lg:w-1/2 w-full h-1/2 left-1/2 bottom-0 -translate-x-1/2 bg-white rounded-t-xl shadow-t-lg transition-all ease-in-out duration-500 will-change-auto pointer-events-auto" ref={card}>
            <div style={{background: `${props.labelColor}`}} className="absolute font-bold w-fit px-2 text-xl rounded-b mr-4 right-0">{props.header}</div>
            <button onClick={toggleCard} className="block ml-auto mr-auto mt-2 w-12 h-2 bg-gray-200 rounded-full m-0"></button>
            <div style={props.coveredSize != null ? {maxHeight: `calc(100% - ${props.coveredSize * 2}px)`} : {}}
                 className="flex p-5 mt-5 text-black overflow-auto" ref={cardContent}>{props.items}</div>
        </div>

}));

Card.displayName = "Card";

export default Card;