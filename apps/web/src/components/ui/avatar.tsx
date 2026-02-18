import { Avatar as BaseAvatar, type AvatarRootProps } from "@chakra-ui/react";

interface AvatarPropsType extends AvatarRootProps {
    name: string,
    size?: "xs" | "xl" | "sm" | "md" | "lg"
}

const Avatar = ({ name, size = "md", ...rest }: AvatarPropsType) => {

    return (
        <BaseAvatar.Root {...rest} variant="solid" size={size}>
            <BaseAvatar.Fallback name={name} />
        </BaseAvatar.Root>
    )

}
export default Avatar;
