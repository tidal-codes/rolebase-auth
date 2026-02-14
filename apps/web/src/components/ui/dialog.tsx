import { Dialog as BaseDialog, Portal } from "@chakra-ui/react"
import { type ReactNode } from "react"

interface DialogProps {
    trigger?: ReactNode
    open: boolean,
    setOpen: (open: boolean) => void
    children: ReactNode

}

const Dialog = ({ trigger, open, setOpen, children }: DialogProps) => {
    return (
        <BaseDialog.Root
            lazyMount
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            placement={"center"}
        >
            {trigger && (
                <BaseDialog.Trigger asChild>
                    {trigger}
                </BaseDialog.Trigger>
            )}
            <Portal>
                <BaseDialog.Positioner bgColor="blackAlpha.200">
                    <BaseDialog.Content rounded="xl">
                        {children}
                    </BaseDialog.Content>
                </BaseDialog.Positioner>
            </Portal>
        </BaseDialog.Root>
    )
}

export default Dialog;
