import React from "react";
export type PropType<T extends (...args: any) => any> = Parameters<T>[0];
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
