import { createContext } from "react";

interface IAppCtx {

}

export const AppCtx = createContext<IAppCtx>({} as IAppCtx)