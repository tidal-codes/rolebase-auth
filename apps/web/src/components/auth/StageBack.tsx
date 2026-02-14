import { Button} from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { AuthStage } from '../../@types/auth';


interface StageBackProps {
    setStage: Dispatch<SetStateAction<AuthStage>>,
}

const StageBack = ({ setStage }: StageBackProps) => {


    return (
            <Button
                size="sm"
                variant="ghost"
                position="absolute"
                alignItems="center"
                color="fg.info"
                gap="1"
                top="5"
                left="5"
                onClick={() => setStage("LOGIN")}
            >
                <ArrowLeft size="16" />
                Go Back
            </Button>
    );
}

export default StageBack;
