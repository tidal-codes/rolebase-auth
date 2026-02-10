import React, { useState } from 'react';
import Field from '../ui/field';
import { Button } from '@chakra-ui/react';
import FormContainer from './FormContainer';

const Register = () => {
    const [email, setEmail] = useState("");
    return (

        <FormContainer>
            <Field label="email" value={email} setValue={setEmail} />
            <Field label="full name" value={email} setValue={setEmail} />
            <Field label="password" value={email} setValue={setEmail} />
            <Field label="two step passwrod" value={email} setValue={setEmail} />
            <Button>
                submit
            </Button>
        </FormContainer>

    );
}

export default Register;
