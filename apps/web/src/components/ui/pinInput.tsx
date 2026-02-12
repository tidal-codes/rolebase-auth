import { PinInput as BasePinInput, Box } from "@chakra-ui/react";
import { motion } from "motion/react";
import { type Dispatch, type SetStateAction } from "react";

interface PinInputProps {
    length: number,
    value: string[],
    onValueChange: Dispatch<SetStateAction<string[]>>
}

const MotionBox = motion.create(Box);

const PinInput = ({ length, value, onValueChange }: PinInputProps) => {
    return (
        <BasePinInput.Root
            placeholder=""
            value={value}
            onValueChange={({ value }) => onValueChange(value)}
            selectOnFocus
        >
            <BasePinInput.HiddenInput />
            <BasePinInput.Control>
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
                                <BasePinInput.Input
                                    index={i}
                                    bgColor="white"
                                    w="55px"
                                    h="55px"
                                    fontSize="xl"

                                />
                            </MotionBox>
                        );
                    })
                }
            </BasePinInput.Control>
        </BasePinInput.Root>
    );
}

export default PinInput;
