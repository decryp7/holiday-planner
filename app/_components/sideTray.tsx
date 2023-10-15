import React from "react";


const SideTray = React.memo((props: {children: any} , context) =>{
    return <div className="absolute w-[40px] right-[0.5rem] top-[4rem] flex flex-col space-y-2 text-gray-800">
        {props.children}
    </div>;
});

SideTray.displayName = "SideTray";

export default SideTray;