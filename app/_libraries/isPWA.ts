import {GlobalRef} from "@/app/_libraries/globalRef";

const checkPWA = new GlobalRef<boolean>("isPWA");
if(checkPWA.value === undefined){
    const mqStandAlone = '(display-mode: standalone)';
    checkPWA.value = !!((global.navigator && 'standalone' in global.navigator && global.navigator.standalone) ||
        (global.window && 'matchMedia' in global.window && global.window.matchMedia(mqStandAlone).matches));
}

export const isPWA = checkPWA.value;