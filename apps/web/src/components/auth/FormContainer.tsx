import { Box, Flex } from '@chakra-ui/react';
import { motion, type Transition } from 'motion/react';
import React from 'react';

const MotionFlex = motion.create(Flex);
const MotionBox = motion.create(Box);

const parentVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const childTransition: Transition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
};

const childVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: childTransition },
};

interface FormContainerProps {
    children: React.ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
    return (
        <MotionFlex
            variants={parentVariants}
            initial="hidden"
            animate="visible"
            exit={{}}
            w="full"
            flexDir="column"
            gap="3"
        >
            {React.Children.map(children, (child) => (
                <MotionBox variants={childVariants}>
                    {child}
                </MotionBox>
            ))}
        </MotionFlex>
    );
};

export default FormContainer;
