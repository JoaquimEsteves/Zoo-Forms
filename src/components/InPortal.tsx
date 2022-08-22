import React from "react";
import ReactDOM from "react-dom";
import { IIFE, isNullish } from "utils/pureFunctions";

const InPortal: React.FC<{
  children: React.ReactNode;
  id?: string;
  className?: string;
}> = ({ children, className, id = "modal-root" }) => {
  const modal = React.useRef<HTMLDivElement>(null);

  if (isNullish(modal.current)) {
    // Technically this is a side-effect
    // But it's fine
    // @ts-ignore
    modal.current = IIFE(() => {
      const element =
        document.getElementById(id) ?? document.createElement("div");
      element.setAttribute("id", id);
      element.setAttribute("class", className ?? "");
      return element;
    });
  }

  React.useEffect(() => {
    document.body.appendChild(modal.current as HTMLDivElement);
    return () => {
      modal.current?.remove();
    };
  }, [id]);

  return ReactDOM.createPortal(children, modal.current as HTMLDivElement);
};

export default React.memo(InPortal);
