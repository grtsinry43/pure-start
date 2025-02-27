"use client"

import {useState, useEffect} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {Search, Github, Twitter, Mail, Sun, Moon, Cloud, Coffee, Bookmark, Music, Settings} from "lucide-react"
import {Input} from "@/components/ui/input"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {cn} from "@/lib/utils"

export default function ElegantStartPage() {
    const [time, setTime] = useState(new Date())
    const [searchFocused, setSearchFocused] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        // Check system preference for dark mode
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark")
        }
    }, [])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle("dark")
    }

    const getGreeting = () => {
        const hour = time.getHours()
        if (hour < 12) return "Good morning"
        if (hour < 18) return "Good afternoon"
        return "Good evening"
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchValue.trim()) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(searchValue)}`, "_blank")
        }
    }

    const quickLinks = [
        {icon: <Github className="w-4 h-4"/>, url: "https://github.com", label: "GitHub", category: "work"},
        {icon: <Twitter className="w-4 h-4"/>, url: "https://twitter.com", label: "Twitter", category: "social"},
        {icon: <Mail className="w-4 h-4"/>, url: "https://gmail.com", label: "Gmail", category: "work"},
        {icon: <Bookmark className="w-4 h-4"/>, url: "https://pinterest.com", label: "Pinterest", category: "social"},
        {icon: <Music className="w-4 h-4"/>, url: "https://spotify.com", label: "Spotify", category: "media"},
        {icon: <Coffee className="w-4 h-4"/>, url: "https://medium.com", label: "Medium", category: "reading"},
        {icon: <Cloud className="w-4 h-4"/>, url: "https://drive.google.com", label: "Drive", category: "work"},
        {icon: <Settings className="w-4 h-4"/>, url: "https://settings", label: "Settings", category: "system"},
    ]

    const filteredLinks = activeTab === "all" ? quickLinks : quickLinks.filter((link) => link.category === activeTab)

    return (
        <div
            className={cn(
                "min-h-screen flex items-center justify-center p-4 transition-colors duration-500",
                isDarkMode ? "dark" : "",
            )}
        >
            {/* Background with overlay */}
            <div className="fixed inset-0 z-[-1]">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"/>
                <img
                    src="https://dogeoss.grtsinry43.com/volantis-static/media/wallpaper/minimalist/2020/006.webp"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Animated particles */}
            <div className="fixed inset-0 z-0 opacity-30">
                {Array.from({length: 20}).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: Math.random() * 0.5 + 0.3,
                        }}
                        animate={{
                            y: [null, Math.random() * 100 + "%"],
                            opacity: [null, Math.random() * 0.3 + 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 10,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                className="w-full max-w-3xl space-y-12 z-10"
            >
                {/* Dark mode toggle */}
                <motion.button
                    className="absolute top-6 right-6 p-2 rounded-full bg-background/20 backdrop-blur-lg border border-white/10 text-white"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={toggleDarkMode}
                >
                    {isDarkMode ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                </motion.button>

                {/* Time and greeting section */}
                <div className="text-center space-y-4">
                    <motion.h2
                        className="text-lg font-medium text-white/80"
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{delay: 0.2, duration: 0.6}}
                    >
                        {getGreeting()}
                    </motion.h2>

                    <motion.h1
                        className="text-7xl font-bold tracking-tight text-white"
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{type: "spring", stiffness: 100, damping: 15}}
                    >
                        {time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                    </motion.h1>

                    <motion.p
                        className="text-sm text-white/70"
                        initial={{y: 20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{delay: 0.3, duration: 0.6}}
                    >
                        {time.toLocaleDateString([], {weekday: "long", year: "numeric", month: "long", day: "numeric"})}
                    </motion.p>
                </div>

                {/* Search bar */}
                <motion.form
                    className="relative mx-auto max-w-lg"
                    initial={false}
                    animate={searchFocused ? {scale: 1.02} : {scale: 1}}
                    transition={{duration: 0.2}}
                    onSubmit={handleSearch}
                >
                    <Input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="探索未知..."
                        className="w-full pl-12 pr-4 py-6 rounded-xl bg-background/20 backdrop-blur-xl border-white/10 text-white placeholder:text-white/50 focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all duration-200"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5"/>

                    <motion.div
                        className="absolute -bottom-8 left-0 right-0 text-center text-xs text-white/50"
                        initial={{opacity: 0}}
                        animate={{opacity: searchFocused ? 1 : 0}}
                    >
                        Press Enter to search
                    </motion.div>
                </motion.form>

                {/* Quick links section */}
                <motion.div
                    className="mt-16 space-y-6"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, duration: 0.6}}
                >
                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-fit mx-auto">
                        <TabsList className="bg-background/20 backdrop-blur-xl border border-white/10">
                            <TabsTrigger
                                value="all"
                                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
                            >
                                All
                            </TabsTrigger>
                            <TabsTrigger
                                value="work"
                                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
                            >
                                Work
                            </TabsTrigger>
                            <TabsTrigger
                                value="social"
                                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
                            >
                                Social
                            </TabsTrigger>
                            <TabsTrigger
                                value="media"
                                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
                            >
                                Media
                            </TabsTrigger>
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
                                        transition: {delay: index * 0.05 + 0.2},
                                    }}
                                    className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-background/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors duration-200"
                                >
                                    <div className="p-3 rounded-full bg-white/10">{link.icon}</div>
                                    <span className="text-sm text-white/80">{link.label}</span>
                                </motion.a>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    )
}

