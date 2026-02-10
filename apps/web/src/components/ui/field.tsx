import { Field as BaseField, Input } from '@chakra-ui/react'
import type React from 'react';

interface FieldProps {
    label: string | null;
    helperText?: string;
    errorText?: string;
    placeholder?: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Field = ({ label, helperText, errorText, value, placeholder, setValue }: FieldProps) => {
    return (
        <BaseField.Root>
            <BaseField.Label>
                {label}
            </BaseField.Label>
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {
                helperText && (
                    <BaseField.HelperText>
                        {helperText}
                    </BaseField.HelperText>
                )
            }
            {
                errorText && (
                    <BaseField.ErrorText>
                        {errorText}
                    </BaseField.ErrorText>
                )
            }

        </BaseField.Root>
    );
}

export default Field;
