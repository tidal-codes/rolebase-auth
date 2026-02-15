import { Menu as BaseMenu, Portal } from "@chakra-ui/react"
import type { Dispatch, ReactNode, SetStateAction } from "react"

interface MenuProps {
    children: ReactNode,
    trigger: ReactNode,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const Menu = ({ children, trigger, open, setOpen }: MenuProps) => {

    return (
        <BaseMenu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <BaseMenu.Trigger asChild>
                {trigger}
            </BaseMenu.Trigger>
            <Portal>
                <BaseMenu.Positioner>
                    <BaseMenu.Content>
                        {children}
                    </BaseMenu.Content>
                </BaseMenu.Positioner>
            </Portal>
        </BaseMenu.Root>
    )
}

export default Menu;
