import React, {Children, Fragment, ReactNode, useEffect, useRef, useState} from "react";
import Card from "@/app/_components/card";

const CardGroup = React.memo((props : {children: any} , context) =>{
    const childRef = useRef<any>([]);

    const renderChildren = () => {
        return React.Children.map(props.children, (child, index) => {
            return React.cloneElement(child, {
                ref: ((el: typeof Card) => {
                    childRef.current[index] = el;
                }),
            });
        });
    };

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

    return <Fragment>{renderChildren()}</Fragment>;
});

CardGroup.displayName = "CardGroup";

export default CardGroup;