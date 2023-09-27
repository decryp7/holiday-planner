import React, {Children, Fragment, ReactNode, useEffect, useRef, useState} from "react";
import Card, {CardInfo} from "@/app/_components/card";

const CardGroup = React.memo((
    props : {cards: CardInfo[]}, context) =>{
    const childRef = useRef<any[]>([]);

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

    return <div className="">
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
    </div>;
});

CardGroup.displayName = "CardGroup";

export default CardGroup;