import React from "react";
import { Input } from "@/components/ui/input";

interface LumaInputProps extends React.ComponentPropsWithoutRef<"input"> {
  placeholder: string;
}

const LumaInput = React.forwardRef<HTMLInputElement, LumaInputProps>(
  ({ placeholder, type = "text", ...rest }, ref) => {
    return (
      <Input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="max-w-md w-full rounded-sm shadow-none"
        {...rest}
      />
    );
  }
);

LumaInput.displayName = "LumaInput";
export default LumaInput;
