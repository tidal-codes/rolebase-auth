import { useEffect, useState } from "react";
import Dialog from "../ui/dialog";
import { Button, Flex, Text } from "@chakra-ui/react";
import { TriangleAlert } from "lucide-react";
import { useLogout } from "../../hooks/auth/queries";
import { setAxiosLogoutFn } from "../../libs/client";


const ExpiredSessionDialog = () => {
    const [open, setOpen] = useState(false);
    const { handleLogout, isPending } = useLogout();
    useEffect(() => {
        setAxiosLogoutFn(() => {
            setOpen(true);
        })
    }, [])
    return (
        <Dialog
            open={open}
            setOpen={setOpen}
            size="xs"
            closeOnInteractOutside={false}
        >
            <Flex
                flexDir="column"
                p="3"
                gap="2"
            >
                <Flex gap="2">
                    <Text color="fg.error">
                        <TriangleAlert />
                    </Text>
                    <Text
                        fontSize="xl"
                    >
                        Your session has expired.
                    </Text>
                </Flex>
                <Text color="fg.muted">
                    Please sign in again to continue.
                </Text>
                <Button
                    mt="3"
                    onClick={handleLogout}
                    loading={isPending}
                >
                    Go to login page
                </Button>
            </Flex>
        </Dialog>
    );
}

export default ExpiredSessionDialog;
