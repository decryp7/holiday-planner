import React from "react";

const ErrorSkeleton = React.memo((
    props : {message: string} , context) =>{
    return <div className="w-full h-screen flex items-center justify-center">
        <span className="text-gray-800 text-2xl">{props.message}</span>
    </div>;

});

ErrorSkeleton.displayName = "LoadingSkeleton";

export default ErrorSkeleton;