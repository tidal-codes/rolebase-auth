import {
    createSystem,
    defaultConfig,
    defineConfig,
} from "@chakra-ui/react"
import { buttonRecipe } from "./recipes/button.recipe"
import { inputRecipe } from "./recipes/input.recipe"

const config = defineConfig({
    theme: {
        tokens: {
            colors: {},

            fonts: {
                body: {
                    value: "SN Pro, sans-serif"
                }
            }
        },
        semanticTokens: {
            colors: {
                patternColor: {
                    value: {
                        _light: "gray.400",
                        _dark: "gray.500"
                    }
                }
            },
            
        },
        recipes: {
            button: buttonRecipe,
            input: inputRecipe
        },

    },
})

export const system = createSystem(defaultConfig, config)
