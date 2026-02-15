import { Menu } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface MenuItemProps {
    value: string,
    children: ReactNode,
    onClick: () => void
}

const MenuItem = ({ value, onClick, children }: MenuItemProps) => {
    return (
        <Menu.Item value={value} onClick={onClick}>{children}</Menu.Item>
    );
}

export default MenuItem;
