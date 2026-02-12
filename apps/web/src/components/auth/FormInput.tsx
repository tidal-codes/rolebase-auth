import { Box } from "@chakra-ui/react";
import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import Field from "../ui/field";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface FormInputProps<T extends FieldValues> {
    disabled?: boolean;
    placeholder: string;
    errors: FieldErrors<T>;
    register: UseFormRegister<T>;
    icon?: React.ReactNode;
    onInsideButtonClick?: () => void
    password?: boolean;
    field: Path<T>
}

const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
    const [visiblePassword, setVisiblePassword] = useState(() => props.password);
    const inputType = visiblePassword ? "password" : "text";

    function getIcon() {
        if (props.password) {
            if (visiblePassword) return <EyeClosed />
            return <Eye />
        } else {
            return props.icon
        }
    }

    return (
        <Box position="relative">
            <Field<T>
                placeholder={props.placeholder}
                register={props.register}
                errorText={props.errors[props.field]?.message as string}
                invalid={Boolean(props.errors[props.field]?.message)}
                field={props.field}
                label={null}
                inputType={inputType}
                disabled={props.disabled}
                onInsideButtonClick={
                    () => {
                        if (props.password) {
                            setVisiblePassword(prev => !prev);
                            return;
                        }
                        props.onInsideButtonClick?.();
                    }
                }
                showInsideButton={props.password || props.disabled}
                insideButtonIcon={getIcon()}
            />
        </Box>
    );
}

export default FormInput;


