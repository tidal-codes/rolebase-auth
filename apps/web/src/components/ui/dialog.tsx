import { Dialog as BaseDialog, Portal, type DialogRootProps } from "@chakra-ui/react"
import { type ReactNode } from "react"

interface DialogProps extends DialogRootProps {
    trigger?: ReactNode
    open: boolean,
    setOpen: (open: boolean) => void
    children: ReactNode

}

const Dialog = ({ trigger, open, setOpen, children, ...rest }: DialogProps) => {
    return (
        <BaseDialog.Root
            lazyMount
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            placement={"center"}
            size="lg"
            {...rest}
        >
            {trigger && (
                <BaseDialog.Trigger asChild>
                    {trigger}
                </BaseDialog.Trigger>
            )}
            <Portal>
                <BaseDialog.Positioner bgColor="blackAlpha.200" px="2">
                    <BaseDialog.Content rounded="xl">
                        {children}
                    </BaseDialog.Content>
                </BaseDialog.Positioner>
            </Portal>
        </BaseDialog.Root>
    )
}

export default Dialog;
