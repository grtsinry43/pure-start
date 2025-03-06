"use client"

import React, {useEffect, useRef, useState} from "react"
import {cn} from "@/lib/utils"
import {AnimatePresence, motion} from "framer-motion"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Bookmark, Cloud, Coffee, Github, Mail, Music, Twitter, X} from "lucide-react"
import {useAppSelector} from "@/hooks/redux"
import {Button} from "@/components/ui/button"
import {BookmarkDialog} from "@/components/bookmark/BookmarkDialog";
import {ScrollArea} from "@/components/ui/scroll-area";
import {IconKey} from "@/store/bookmark";

const iconMap: Record<IconKey, JSX.Element> = {
    github: <Github className="w-4 h-4"/>,
    twitter: <Twitter className="w-4 h-4"/>,
    mail: <Mail className="w-4 h-4"/>,
    bookmark: <Bookmark className="w-4 h-4"/>,
    music: <Music className="w-4 h-4"/>,
    coffee: <Coffee className="w-4 h-4"/>,
    cloud: <Cloud className="w-4 h-4"/>,
};

const BookMarkSection = ({searchFocused}: { searchFocused: boolean }) => {
    const bookmarkStore = useAppSelector((state) => state.bookmarkStore)
    const bookmark = useAppSelector((state) => state.bookmark)
    const quickLinks = bookmarkStore.bookmarkList
    const [activeTab, setActiveTab] = React.useState("all")
    const [isExpanded, setIsExpanded] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

    const filteredLinks = activeTab === "all" ? quickLinks : quickLinks.filter((link) => link.category === activeTab)

    const limitedLinks = filteredLinks.slice(0, 8)

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (!sectionRef.current || searchFocused) return

            if (bookmark.isSlideBlocked) return

            const rect = sectionRef.current.getBoundingClientRect()
            const isMouseOverSection =
                e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

            if (isMouseOverSection) {
                if (e.deltaY > 0 && !isExpanded) {
                    setIsExpanded(true)
                    document.body.style.overflow = "hidden"
                }

                if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current)
                }
            }
        }

        window.addEventListener("wheel", handleScroll)

        return () => {
            window.removeEventListener("wheel", handleScroll)
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current)
            }
        }
    }, [bookmark.isSlideBlocked, isExpanded, searchFocused])

    const getIcon = (link: { icon: string; url: string; label: string }) => {
        if (iconMap.hasOwnProperty(link.icon)) {
            return iconMap[link.icon as IconKey];
        } else {
            try {
                const url = new URL(link.url);
                const faviconUrl = `${url.origin}/favicon.ico`;
                // eslint-disable-next-line @next/next/no-img-element
                return <img src={faviconUrl || "/placeholder.svg"} alt={link.label} className="w-4 h-4"/>;
            } catch (error) {
                console.log("Failed to get favicon for", link.url, error);
                return (
                    <span className="w-4 h-4 flex items-center justify-center bg-foreground/20 rounded-full">
                    {link.label.charAt(0)}
                </span>
                );
            }
        }
    };

    const handleClose = () => {
        setIsExpanded(false)
        document.body.style.overflow = ""
    }

    return (
        <div ref={sectionRef} className="relative">
            <div
                className={cn(
                    searchFocused ? "opacity-70 blur-sm" : "opacity-100",
                    isExpanded ? "opacity-0 pointer-events-none" : "",
                    "transition duration-200 ease-in-out",
                    "pt-8",
                )}
            >
                <motion.div
                    className="mt-4 space-y-6"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, duration: 0.6}}
                >
                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-fit mx-auto">
                        <TabsList className="bg-background/20 backdrop-blur-xl border border-white/10">
                            <TabsTrigger
                                key="all"
                                value="all"
                                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-foreground/10"
                            >
                                全部
                            </TabsTrigger>
                            {bookmarkStore.categoryList.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-foreground/10"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            transition={{duration: 0.3}}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
                        >
                            {limitedLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{scale: 1.05, y: -5}}
                                    whileTap={{scale: 0.95}}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {delay: index * 0.05 + 0.2},
                                    }}
                                    className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-background/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors duration-200"
                                >
                                    <div className="p-3 rounded-full bg-foreground/10">{getIcon(link)}</div>
                                    <span className="text-sm text-white/80">{link.label}</span>
                                </motion.a>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredLinks.length > 8 && (
                        <motion.div className="flex justify-center mt-4" initial={{opacity: 0}}
                                    animate={{opacity: 0.7}}>
                            <div className="text-foreground/50 text-sm flex items-center gap-1">
                                <Bookmark className="w-3 h-3"/>
                                <span> 向上滚动查看更多 ({filteredLinks.length - 8})</span>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 100}}
                        transition={{type: "spring", damping: 25, stiffness: 120}}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md overflow-y-auto"
                    >
                        <ScrollArea className="h-full">
                            <div className="container mx-auto py-8 px-4">
                                <div className="flex justify-between items-center mb-8">
                                    <motion.h2
                                        initial={{opacity: 0, x: -20}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.2}}
                                        className="text-2xl font-bold text-foreground mt-8"
                                    >
                                        全部书签
                                    </motion.h2>
                                    <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                                transition={{delay: 0.2}}
                                                className="flex items-center"
                                    >
                                        <div>
                                            <BookmarkDialog/>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handleClose}
                                            className="rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground ml-6"
                                        >
                                            <X className="w-5 h-5"/>
                                        </Button>
                                    </motion.div>
                                </div>

                                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}
                                      className="w-fit mx-auto mb-8">
                                    <TabsList className="bg-background/20 backdrop-blur-xl border border-white/10">
                                        <TabsTrigger
                                            key="all"
                                            value="all"
                                            className="text-foreground/70 data-[state=active]:text-foreground data-[state=active]:bg-foreground/10"
                                        >
                                            全部
                                        </TabsTrigger>
                                        {bookmarkStore.categoryList.map((category) => (
                                            <TabsTrigger
                                                key={category}
                                                value={category}
                                                className="text-foreground/70 data-[state=active]:text-foreground data-[state=active]:bg-foreground/10"
                                            >
                                                {category}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </Tabs>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab + "-expanded"}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.3}}
                                    >
                                        {activeTab === "all" ? (
                                            <div className="space-y-12">
                                                {bookmarkStore.categoryList.map((category) => {
                                                    const categoryLinks = quickLinks.filter((link) => link.category === category)
                                                    if (categoryLinks.length === 0) return null

                                                    return (
                                                        <div key={category} className="space-y-4">
                                                            <h3 className="text-xl font-medium text-foreground/90 border-b border-white/10 pb-2">
                                                                {category}
                                                            </h3>
                                                            <div
                                                                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                                                {categoryLinks.map((link, index) => (
                                                                    <motion.a
                                                                        key={index}
                                                                        href={link.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        whileHover={{scale: 1.05, y: -5}}
                                                                        whileTap={{scale: 0.95}}
                                                                        initial={{opacity: 0, y: 20}}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            y: 0,
                                                                            transition: {delay: index * 0.02 + 0.1},
                                                                        }}
                                                                        className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-background/10 backdrop-blur-md border border-white/10 hover:bg-foreground/20 transition-colors duration-200"
                                                                    >
                                                                        <div
                                                                            className="p-3 rounded-full bg-foreground/10">{getIcon(link)}</div>
                                                                        <span
                                                                            className="text-sm text-foreground/80">{link.label}</span>
                                                                    </motion.a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                                {filteredLinks.map((link, index) => (
                                                    <motion.a
                                                        key={index}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{scale: 1.05, y: -5}}
                                                        whileTap={{scale: 0.95}}
                                                        initial={{opacity: 0, y: 20}}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: {delay: index * 0.03 + 0.1},
                                                        }}
                                                        className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-background/10 backdrop-blur-md border border-white/10 hover:bg-foreground/20 transition-colors duration-200"
                                                    >
                                                        <div
                                                            className="p-3 rounded-full bg-foreground/10">{getIcon(link)}</div>
                                                        <span className="text-sm text-foreground/80">{link.label}</span>
                                                    </motion.a>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </ScrollArea>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default BookMarkSection

