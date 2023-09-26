import React, {Children, Fragment, useEffect, useRef, useState} from "react";
import Card from "@/app/_components/card";

const CardGroup = React.memo((props : {children: any} , context) =>{

    return <Fragment>{props.children}</Fragment>;
});

CardGroup.displayName = "CardGroup";

export default CardGroup;