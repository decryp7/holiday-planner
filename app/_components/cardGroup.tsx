import React, {Fragment, useEffect, useRef} from "react";
import Card, {CardInfo} from "@/app/_components/card";
import {useRecoilState, useRecoilValue} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";
import {cardGroupVisibleState} from "@/app/_state/cardGroupVisibleState";

const CardGroup = React.memo((
    props : {cards: CardInfo[]}, context) =>{
    const childRef = useRef<{[key:string]: any}>({});
    const [activeCard, setActiveCard] = useRecoilState(activeCardState);
    const cardGroupVisible = useRecoilValue(cardGroupVisibleState);

    function handleShow(header: string){
        for(const key in childRef.current){
            if(key !== header){
                childRef.current[key].hide?.();
            }
        }
        setActiveCard(header);
    }

    function handleHide(header: string){
        setActiveCard('');
    }

    useEffect(() => {
        for(const key in childRef.current){
            if(key === activeCard){
                childRef.current[key].show?.();
            }else{
                childRef.current[key].hide?.();
            }
        }
    }, [activeCard]);

    useEffect(() => {
        for(const key in childRef.current){
            childRef.current[key].onShow?.(handleShow);
            childRef.current[key].onHide?.(handleHide);
        }

        return () => {};
    }, []);

    function setRef(el: any){
        if(el != null) {
            childRef.current[el.header] = el;
        }
    }

    return <Fragment>
        <div className={cardGroupVisible ? "visible": "hidden"}>
            {props.cards.map((card, index) => {
                const numOfCards = props.cards.length;
                const headerSize = ((numOfCards - index) * 20) + 20;
                return (<Card key={index} header={card.header}
                      headerSize={headerSize}
                      labelColor={card.labelColor}
                      content={card.content}
                              coveredSize={numOfCards * 20}
                      ref={setRef}/>);
            })}
        </div>
    </Fragment>;
});

CardGroup.displayName = "CardGroup";

export default CardGroup;