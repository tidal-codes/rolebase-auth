import { Field as BaseField, Box, Button, Input, Textarea, type TextareaProps } from '@chakra-ui/react'
import type { ReactNode } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface FieldProps<Fields extends FieldValues> {
    label: string | null;
    helperText?: string;
    errorText?: string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    inputType?: string;
    textarea?: boolean;
    register: UseFormRegister<Fields>
    field: Path<Fields>;
    showInsideButton?: boolean;
    onInsideButtonClick?: () => void;
    insideButtonIcon?: ReactNode;
    textAreaProps?: TextareaProps
}

const Field = <Fields extends FieldValues>(props: FieldProps<Fields>) => {
    return (
        <BaseField.Root
            invalid={props.invalid}
        >
            {props.label && (
                <BaseField.Label>
                    {props.label}
                </BaseField.Label>
            )}

            <Box w="full" position="relative">

                {
                    Boolean(props.textarea) ? (
                        <Textarea
                            {...props.register(props.field)}
                            {...props.textAreaProps}
                        />
                    ) : (
                        <Input
                            placeholder={props.placeholder}
                            {...props.register(props.field)}
                            disabled={props.disabled}
                            type={props.inputType}
                        />
                    )
                }


                {props.showInsideButton && (
                    <Button
                        position="absolute"
                        right="2"
                        top="50%"
                        bottom="50%"
                        translate="0 -50%"
                        size="small-icon"
                        variant="subtle"
                        onClick={props.onInsideButtonClick}
                    >
                        {props.insideButtonIcon}
                    </Button>
                )}
            </Box>

            {
                props.helperText && (
                    <BaseField.HelperText>
                        {props.helperText}
                    </BaseField.HelperText>
                )
            }
            {
                props.errorText && (
                    <BaseField.ErrorText fontSize="sm">
                        {props.errorText}
                    </BaseField.ErrorText>
                )
            }

        </BaseField.Root>
    );
}

export default Field;
