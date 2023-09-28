import React, {Children, Fragment, ReactNode, useEffect, useRef, useState} from "react";
import Card, {CardInfo} from "@/app/_components/card";
import {ArchiveBoxArrowDownIcon, ArchiveBoxIcon} from "@heroicons/react/24/outline";

enum Visibility {
    visible,
    hidden
}

const CardGroup = React.memo((
    props : {cards: CardInfo[]}, context) =>{
    const childRef = useRef<{[key:string]: any}>({});
    const [visibility, setVisibility] = useState<Visibility>(Visibility.visible);

    function handleShow(header: string){
        for(const key in childRef.current){
            if(childRef.current[key] !== header){
                childRef.current[key].hide?.();
            }
        }
    }

    useEffect(() => {
        for(const key in childRef.current){
            childRef.current[key].onShow?.(handleShow);
        }

        return () => {};
    }, []);

    function setRef(el: any){
        if(el != null) {
            childRef.current[el.header] = el;
        }
    }

    function toggleVisibility(){
        setVisibility(prev => {
            if(prev === Visibility.hidden){
                return Visibility.visible;
            }

            return Visibility.hidden;
        })
    }

    return <Fragment>
        <button className="absolute right-[0.5rem] bottom-[200px] p-1 w-[40px] h-[40px] bg-white shadow rounded-[2px]"
                onClick={toggleVisibility}>
            {visibility === Visibility.visible ?
            <ArchiveBoxArrowDownIcon className="w-auto h-auto text-gray-800 stroke-2" />
                : <ArchiveBoxIcon className="w-auto h-auto text-gray-800 stroke-2" />
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