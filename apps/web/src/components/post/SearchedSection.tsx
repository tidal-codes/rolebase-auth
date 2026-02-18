import { Box, Flex, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchStore } from "../../stores/search";
import { AnimateChangeInHeight } from "../AnimateChangeInHeight";


const MotionFlex = motion(Flex);
const MotionText = motion(Text);

export default function SearchedSection() {
    const search = useSearchStore(state => state.search);
    const searchResultCount = useSearchStore(state => state.searchResultCount);

    return (
        <Box w="full">
            <AnimateChangeInHeight>
                <AnimatePresence mode="wait">
                    {search.trim() && (
                        <MotionFlex
                            key="search-container"
                            pt="8"
                            alignItems="center"
                            justifyContent="space-between"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.08
                                }
                            }}
                            exit={{ opacity: 0 }}
                            smDown={{
                                flexDir: "column",
                                alignItems: "flex-start"
                            }}
                            minW="0"
                        >
                            <MotionFlex alignItems="center" gap="2">
                                <MotionText
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.35, ease: "easeOut" }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -8,
                                        transition: { duration: 0.2 }
                                    }}
                                    fontSize="xl"
                                    flexWrap="nowrap"
                                    whiteSpace="nowrap"
                                >
                                    Search results for:
                                </MotionText>

                                <MotionText
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.35, ease: "easeOut" }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -8,
                                        transition: { duration: 0.2 }
                                    }}
                                    fontSize="2xl"
                                    fontWeight="medium"
                                    minW="0"
                                    truncate
                                >
                                    {search}
                                </MotionText>
                            </MotionFlex>

                            <MotionText
                                initial={{ opacity: 0, y: 8 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.35, ease: "easeOut" }
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -8,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {`${searchResultCount} results found`}
                            </MotionText>
                        </MotionFlex>
                    )}
                </AnimatePresence>
            </AnimateChangeInHeight>
        </Box>
    );
}
