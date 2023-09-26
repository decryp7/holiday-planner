import React, {useRef, useState} from "react";

const CardGroup = React.memo((props : {children: any} , context) =>{

    return <div>
        {props.children}
    </div>;
});

CardGroup.displayName = "CardGroup";

export default CardGroup;