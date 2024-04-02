import type {HTMLProps} from "react";
import React, {forwardRef} from "react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    type?: "button" | "submit" | "reset"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({type = "button", children, ...restProps}, ref) =>
        (
            <button ref={ref} type={type} {...restProps}>
                {children}
            </button>
        )
);

Button.displayName = "Button";
