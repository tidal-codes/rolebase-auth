export interface PostDialogContextType {
    open: boolean,
    handleOpen: (open: boolean) => void,
    toggleOpen: () => void
}