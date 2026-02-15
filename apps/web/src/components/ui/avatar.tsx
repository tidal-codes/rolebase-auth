import { Avatar as BaseAvatar } from "@chakra-ui/react";

interface AvatarProps {
    name: string,
    size?: "xs" | "xl" | "sm" | "md" | "lg"
}

const Avatar = ({ name, size = "md" }: AvatarProps) => {

    return (
        <BaseAvatar.Root variant="solid" size={size}>
            <BaseAvatar.Fallback name={name} />
        </BaseAvatar.Root>
    )

}
export default Avatar;
