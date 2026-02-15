import { defineRecipe } from "@chakra-ui/react";


export const buttonRecipe = defineRecipe({
    base: {
        textTransform: "capitalize",
        rounded: "lg",
        _disabled: {
            layerStyle: "fill.solid",
            cursor: "disabled",
            opacity: "0.9"
        },
    },

    variants: {
        size: {
            "2xs": {
                h: "8",
                minW: "6",
                textStyle: "xs",
                px: "2",
                gap: "1",
                _icon: {
                    width: "3.5",
                    height: "3.5",
                },
            },
            xs: {
                h: "10",
                minW: "8",
                textStyle: "xs",
                px: "2.5",
                gap: "1",
                _icon: {
                    width: "4",
                    height: "4",
                },
            },
            sm: {
                h: "11",
                minW: "9",
                px: "3.5",
                textStyle: "sm",
                gap: "2",
                _icon: {
                    width: "4",
                    height: "4",
                },
            },
            md: {
                h: "12",
                minW: "10",
                textStyle: "sm",
                px: "4",
                gap: "2",
                _icon: {
                    width: "5",
                    height: "5",
                },
            },
            lg: {
                h: "11",
                minW: "11",
                textStyle: "md",
                px: "5",
                gap: "3",
                _icon: {
                    width: "5",
                    height: "5",
                },
            },
            xl: {
                h: "12",
                minW: "12",
                textStyle: "md",
                px: "5",
                gap: "2.5",
                _icon: {
                    width: "5",
                    height: "5",
                },
            },
            "2xl": {
                h: "18",
                minW: "16",
                textStyle: "lg",
                px: "7",
                gap: "3",
                _icon: {
                    width: "6",
                    height: "6",
                },
            },
            "small-icon": {
                h: "fit-content",
                w: "fit-content",
                minW: "0",
                px: "2",
                py: "2",
                _icon: {
                    w: "4",
                    h: "4"
                }
            },
            "medium-icon": {
                h: "fit-content",
                w: "fit-content",
                minW: "0",
                px: "2",
                py: "2",
                _icon: {
                    w: "5",
                    h: "5"
                }
            }
        },

        variant: {
            solid: {
                bg: "colorPalette.solid",
                color: "colorPalette.contrast",
                borderColor: "transparent",
                _hover: {
                    bg: "colorPalette.solid/90",
                },
                _expanded: {
                    bg: "colorPalette.solid/90",
                },
            },

            subtle: {
                bg: "colorPalette.subtle",
                color: "colorPalette.fg",
                borderColor: "border",
                _hover: {
                    bg: "colorPalette.muted",
                },
                _expanded: {
                    bg: "colorPalette.muted",
                },
            },

            surface: {
                bg: "colorPalette.subtle",
                color: "colorPalette.fg",
                shadow: "0 0 0px 1px var(--shadow-color)",
                shadowColor: "colorPalette.muted",
                _hover: {
                    bg: "colorPalette.muted",
                },
                _expanded: {
                    bg: "colorPalette.muted",
                },
            },

            outline: {
                borderWidth: "1px",
                "--outline-color-legacy": "colors.colorPalette.muted",
                "--outline-color": "colors.colorPalette.border",
                borderColor: "var(--outline-color, var(--outline-color-legacy))",
                color: "colorPalette.fg",
                _hover: {
                    bg: "colorPalette.subtle",
                },
                _expanded: {
                    bg: "colorPalette.subtle",
                },
            },

            ghost: {
                bg: "transparent",
                color: "colorPalette.fg",
                _hover: {
                    bg: "colorPalette.subtle",
                },
                _expanded: {
                    bg: "colorPalette.subtle",
                },
            },

            plain: {
                color: "colorPalette.fg",
            },
        },
    },

    defaultVariants: {
        size: "md",
        variant: "solid",
    },
})