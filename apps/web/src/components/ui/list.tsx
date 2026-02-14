import { List as BaseList } from "@chakra-ui/react"
import { Children } from "react";

const List = ({ children }: { children: React.ReactNode }) => {
    return (
        <BaseList.Root>
            {Children.map(children, (child) => {
                return <BaseList.Item>
                    {child}
                </BaseList.Item>
            })}
        </BaseList.Root>
    );
}

export default List;
