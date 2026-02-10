import { defineRecipe } from "@chakra-ui/react";


export const inputRecipe = defineRecipe({
    base: {
        _placeholder: {
            textTransform: "capitalize",
        },
        rounded: "lg"
    },

    variants: {
        size: {
            "2xs": {
                textStyle: "xs",
                px: "2",
                "--input-height": "sizes.9",
            },
            xs: {
                textStyle: "xs",
                px: "2",
                "--input-height": "sizes.10",
            },
            sm: {
                textStyle: "sm",
                px: "2.5",
                "--input-height": "sizes.11",
            },
            md: {
                textStyle: "sm",
                px: "3",
                "--input-height": "sizes.12",
            },
            lg: {
                textStyle: "md",
                px: "4",
                "--input-height": "sizes.13",
            },
            xl: {
                textStyle: "md",
                px: "4.5",
                "--input-height": "sizes.14",
            },
            "2xl": {
                textStyle: "lg",
                px: "5",
                "--input-height": "sizes.18",
            },
        },

        variant: {
            outline: {
                bg: "bg.panel",
                borderWidth: "1px",
                borderColor: "border",
                transition: "box-shadow 0.25s ease",
                focusVisibleRing: "none",
                _focusVisible: {
                    borderColor: "var(--focus-color)",
                    boxShadow: "0px 0px 0px 2px var(--focus-color)",
                    _invalid: {
                        borderColor: "var(--error-color)",
                        boxShadow: "0 0 0 3px var(--error-color)",
                    },
                },
            },
            subtle: {
                borderWidth: "1px",
                borderColor: "transparent",
                bg: "bg.muted",
                focusVisibleRing: "inside",
                focusRingColor: "var(--focus-color)",
            },
            flushed: {
                bg: "transparent",
                borderBottomWidth: "1px",
                borderBottomColor: "border",
                borderRadius: "0",
                px: "0",
                _focusVisible: {
                    borderColor: "var(--focus-color)",
                    boxShadow: "0px 1px 0px 0px var(--focus-color)",
                    _invalid: {
                        borderColor: "var(--error-color)",
                        boxShadow: "0px 1px 0px 0px var(--error-color)",
                    },
                },
            },
        },
    },

    defaultVariants: {
        size: "md",
        variant: "outline",
    },
})