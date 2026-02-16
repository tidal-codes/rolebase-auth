import { SegmentGroup as BaseSegmentGroup} from "@chakra-ui/react";

interface SegmentGroupProps {
    value: string | null;
    setValue: (value: string | null) => void;
    items: string[]
}

const SegmentGroup = ({ items, setValue, value }: SegmentGroupProps) => {
    return (
        <BaseSegmentGroup.Root value={value} onValueChange={(e) => setValue(e.value)}>
            <BaseSegmentGroup.Indicator />
            <BaseSegmentGroup.Items items={items} />
        </BaseSegmentGroup.Root>
    );
}

export default SegmentGroup;
