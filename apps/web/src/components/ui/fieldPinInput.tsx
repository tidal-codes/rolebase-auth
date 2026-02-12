import { Stack, Field, PinInput, Box } from '@chakra-ui/react';
import { motion } from 'motion/react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { VerifyCodeForm } from '../../@types/auth';
import { useEffect, useRef } from 'react';

const MotionBox = motion.create(Box);

interface FieldPinInputProps {
    length: number,
    control: Control<VerifyCodeForm>,
    errors: FieldErrors<VerifyCodeForm>
}

const FieldPinInput = ({ length, errors, control }: FieldPinInputProps) => {
    const firstInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        firstInputRef.current?.focus()
    }, [])

    return (
        <Stack gap="4" align="flex-start" maxW="sm">
            <Field.Root invalid={!!errors.pin}>
                <Controller
                    control={control}
                    name="pin"
                    render={({ field }) => (
                        <PinInput.Root
                            value={field.value}
                            onValueChange={(e) => field.onChange(e.value)}
                            placeholder=""

                        >
                            <PinInput.HiddenInput />
                            <PinInput.Control>
                                {
                                    Array.from({ length }).map((_, i) => {
                                        return (
                                            <MotionBox
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.25,
                                                    delay: i * 0.08,
                                                    type: "spring",
                                                    stiffness: 220,
                                                    damping: 20
                                                }}
                                            >
                                                <PinInput.Input
                                                    index={i}
                                                    bgColor="white"
                                                    w="55px"
                                                    h="55px"
                                                    fontSize="xl"
                                                    rounded="lg"
                                                    ref={i === 0 ? firstInputRef : null}

                                                />
                                            </MotionBox>
                                        );
                                    })
                                }
                            </PinInput.Control>
                        </PinInput.Root>
                    )}
                />
                <Field.ErrorText>{errors.pin?.message}</Field.ErrorText>
            </Field.Root>
        </Stack>
    );
}

export default FieldPinInput;
