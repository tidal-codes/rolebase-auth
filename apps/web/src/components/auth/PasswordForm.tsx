import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { motion } from 'motion/react';
import Field from '../ui/field';
import { useState } from 'react';
import FormContainer from './FormContainer';



const PasswordForm = () => {
    const [password, setPassword] = useState("");
    return (
        <FormContainer>
            <Field label="password" placeholder='enter your password' value={password} setValue={setPassword} />
            <Button w="full">log in your account</Button>
        </FormContainer>
    );
}

export default PasswordForm;
