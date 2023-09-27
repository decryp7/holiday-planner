import React, {Children, Fragment, ReactNode, useEffect, useRef, useState} from "react";
import Card, {CardInfo} from "@/app/_components/card";
import {ArchiveBoxArrowDownIcon, ArchiveBoxIcon} from "@heroicons/react/24/outline";

enum Visibility {
    visible,
    collapse
}

const CardGroup = React.memo((
    props : {cards: CardInfo[]}, context) =>{
    const childRef = useRef<any[]>([]);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.visible);

    function handleShow(header: string){
        for(const child of childRef.current){
            if(child.header !== header){
                child.hide?.();
            }
        }
    }

    useEffect(() => {
        for(const child of childRef.current){
            child.onShow?.(handleShow);
        }

        return () => {};
    }, []);

    function setRef(el: any){
        if(el != null) {
            childRef.current.push(el);
        }
    }

    function toggleVisibility(){
        setVisibility(prev => {
            if(prev === Visibility.collapse){
                return Visibility.visible;
            }

            return Visibility.collapse;
        })
    }

    return <Fragment>
        <button className="absolute right-2 top-3/4 p-1 w-[40px] h-[40px] bg-white shadow"
                onClick={toggleVisibility}>
            {visibility === Visibility.visible ?
            <ArchiveBoxArrowDownIcon className="w-auto h-auto text-gray-700 stroke-2" />
                : <ArchiveBoxIcon className="w-auto h-auto text-gray-700 stroke-2" />
            }
        </button>
        <div className={Visibility[visibility]}>

            {props.cards.map((card, index) => {
                const numOfCards = props.cards.length;
                const headerSize = (numOfCards - index) * 20;
                return (<Card key={index} header={card.header}
                      headerSize={headerSize}
                      labelColor={card.labelColor}
                      items={card.items}
                              coveredSize={numOfCards * 20}
                      ref={setRef}/>);
            })}
        </div>
    </Fragment>;
});

CardGroup.displayName = "CardGroup";

export default CardGroup;