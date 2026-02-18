import { Menu, type MenuItemProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface MenuItemPropsType extends MenuItemProps{
    value: string,
    children: ReactNode,
    onClick: () => void,
}

const MenuItem = ({ value, onClick, children, ...rest }: MenuItemPropsType) => {
    return (
        <Menu.Item
            _icon={{
                w: "4",
                h: "4"
            }}
            value={value}
            onClick={onClick}
            {...rest}
        >
            {children}
        </Menu.Item>
    );
}

export default MenuItem;
