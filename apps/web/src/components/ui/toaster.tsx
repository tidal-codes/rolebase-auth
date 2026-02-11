import {
  Toaster as ChakraToaster,
  Portal,
  Stack,
  Toast,
} from "@chakra-ui/react"
import { toaster } from "../../utils/toaster"
import { CircleX, Info } from "lucide-react"



export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root
            backgroundColor="white"
            borderColor="border"
            outlineStyle="inset"
            outline="2px solid"
            bgColor={`bg.${toast.type}`}
            outlineColor={`fg.${toast.type}`}
            width={{ md: "sm" }}
          >
            {/* {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )} */}

            {toast.type === "error" && <CircleX color="var(--chakra-colors-fg-error)" />}
            {toast.type === "info" && <Info color="var(--chakra-colors-fg-info)" />}

            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title color={`fg.${toast.type}`}>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {/* {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />} */}
            {/* <Text>{toast.title}</Text> */}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal >
  )
}
