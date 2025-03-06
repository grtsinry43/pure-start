"use client"

import {useEffect, useState} from "react"
import {
    Layout,
    Clock,
    CloudRainWindIcon as Weather,
    Bookmark,
    Search,
    SettingsIcon, Info,
    Image as ImageIcon,
} from 'lucide-react'

import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {ScrollArea} from "@/components/ui/scroll-area"
import {cn} from "@/lib/utils"
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
// import LayoutSettings from "./LayoutSettings";
import BackgroundSettings from "@/components/settings/BackgroundSettings";
import ClockSettings from "@/components/settings/ClockSettings";
import WeatherSettings from "@/components/settings/WeatherSettings";
import SearchSettings from "@/components/settings/SearchSettings";
import BookmarksSettings from "@/components/settings/BookmarksSettings";
// import ThemeSettings from "@/components/settings/ThemeSettings";
import InfoSettings from "@/components/settings/InfoSettings";

const SettingsDialog = () => {

    const [activeTab, setActiveTab] = useState("appearance")
    const [isOpen, setIsOpen] = useState(false)
    const appearance = useAppSelector(state => state.appearance)
    const dispatch = useAppDispatch();

    const resetSettings = () => {
        localStorage.removeItem("appState")
        window.location.reload()
    }

    useEffect(() => {
        if (isOpen) {
            dispatch({
                type: 'bookmarkSettings/changeIsSlideBlocked',
                payload: true
            })
        } else {
            dispatch({
                type: 'bookmarkSettings/changeIsSlideBlocked',
                payload: false
            })
        }
    }, [dispatch, isOpen])


    const navigationItems = [
        {icon: <Layout className="h-4 w-4"/>, label: "外观", value: "appearance"},
        {icon: <Search className="h-4 w-4"/>, label: "搜索", value: "search"},
        {icon: <Bookmark className="h-4 w-4"/>, label: "书签", value: "bookmarks"},
        // {icon: <Palette className="h-4 w-4"/>, label: "主题", value: "theme"},
        // {icon: <Grid className="h-4 w-4"/>, label: "布局", value: "layout"},
        {icon: <ImageIcon className="h-4 w-4"/>, label: "背景", value: "background"},
        {icon: <Clock className="h-4 w-4"/>, label: "时钟", value: "clock"},
        {icon: <Weather className="h-4 w-4"/>, label: "天气", value: "weather"},
        {icon: <Info className="h-4 w-4"/>, label: "关于", value: "info"},
    ]

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-background/20 backdrop-blur-lg border border-white/10 text-white hover:bg-white/20 hover:text-white"
                    onClick={() => setIsOpen(true)}
                >
                    <SettingsIcon className="h-5 w-5"/>
                    <span className="sr-only"> 设置 </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle className="text-xl"> 设置 </DialogTitle>
                    <DialogDescription>
                        不同体验，随心定制，在此自定义您的起始页
                    </DialogDescription>
                </DialogHeader>

                <div className={`${appearance.isDarkMode ? "dark" : ""}`}>
                    <div className="flex flex-col bg-background/10 text-foreground">
                        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-0">
                            {/* 侧边栏导航 */}
                            <aside className="hidden md:block border-r">
                                <ScrollArea className="h-[60vh]">
                                    <div className="py-4">
                                        <nav className="grid gap-1 px-2">
                                            {navigationItems.map((item) => (
                                                <Button
                                                    key={item.value}
                                                    variant={activeTab === item.value ? "secondary" : "ghost"}
                                                    className={cn(
                                                        "justify-start gap-2 px-3",
                                                        activeTab === item.value ? "bg-secondary font-medium fluent-active" : "font-normal"
                                                    )}
                                                    onClick={() => setActiveTab(item.value)}
                                                >
                                                    {item.icon}
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </nav>
                                    </div>
                                </ScrollArea>
                                {/*/!* 添加 Fluent Design 样式 *!/*/}
                                {/*<style jsx global>{`*/}
                                {/*    .fluent-active::before {*/}
                                {/*        content: "";*/}
                                {/*        position: absolute;*/}
                                {/*        left: 0;*/}
                                {/*        top: 25%;*/}
                                {/*        height: 50%;*/}
                                {/*        width: 3px;*/}
                                {/*        background-color: hsl(var(--primary));*/}
                                {/*        border-radius: 0 2px 2px 0;*/}
                                {/*}*/}
                                {/*`}</style>*/}
                            </aside>

                            {/* 主要内容区域 */}
                            <main className="flex-1">
                                <Tabs
                                    value={activeTab}
                                    onValueChange={setActiveTab}
                                    className="w-full overflow-x-auto"
                                >
                                    <TabsList className="flex p-1 mx-4 md:hidden mt-2 justify-around items-center">
                                        <ScrollArea>
                                            {navigationItems.map((item) => (
                                                <TabsTrigger key={item.value} value={item.value}
                                                             className="flex-shrink-0">
                                                    {item.label}
                                                </TabsTrigger>
                                            ))}
                                        </ScrollArea>
                                    </TabsList>

                                    <ScrollArea className="h-[60vh]">
                                        <div className="px-6 py-4">
                                            <TabsContent value="appearance" className="mt-0 space-y-6">
                                                <AppearanceSettings/>
                                            </TabsContent>
                                            {/*<TabsContent value="layout" className="mt-0 space-y-6">*/}
                                            {/*    <LayoutSettings/>*/}
                                            {/*</TabsContent>*/}
                                            <TabsContent value="background" className="mt-0 space-y-6">
                                                <BackgroundSettings/>
                                            </TabsContent>
                                            <TabsContent value="clock" className="mt-0 space-y-6">
                                                <ClockSettings/>
                                            </TabsContent>
                                            <TabsContent value="weather" className="mt-0 space-y-6">
                                                <WeatherSettings/>
                                            </TabsContent>
                                            <TabsContent value="search" className="mt-0 space-y-6">
                                                <SearchSettings/>
                                            </TabsContent>

                                            <TabsContent value="bookmarks" className="mt-0 space-y-6">
                                                <BookmarksSettings/>
                                            </TabsContent>

                                            {/*<TabsContent value="theme" className="mt-0 space-y-6">*/}
                                            {/*    <ThemeSettings/>*/}
                                            {/*</TabsContent>*/}

                                            <TabsContent value="info" className="mt-0 space-y-6">
                                                <InfoSettings/>
                                            </TabsContent>
                                        </div>
                                    </ScrollArea>
                                </Tabs>
                            </main>
                        </div>
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 border-t">
                    <div className="flex items-center justify-between w-full">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            取消
                        </Button>
                        <div className="flex gap-2">
                            <Dialog>
                                <DialogTrigger>
                                    <Button variant="outline"> 恢复默认 </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            恢复默认设置
                                        </DialogTitle>
                                        <DialogDescription>
                                            <div className="mt-4">
                                                这个操作无法撤销，将会清除所有自定义设置，并恢复到初始状态，您确定要继续吗？
                                                <br/>
                                                完成后，页面将会自动刷新
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsOpen(false)}> 取消 </Button>
                                        <Button onClick={resetSettings}> 确定 </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Button type="submit" onClick={() => setIsOpen(false)}> 完成更改 </Button>
                        </div>
                    </div>
                </DialogFooter>

                {/*<Button*/}
                {/*    variant="ghost"*/}
                {/*    size="icon"*/}
                {/*    className="absolute right-4 top-4"*/}
                {/*    onClick={() => setIsOpen(false)}*/}
                {/*>*/}
                {/*    <X className="h-4 w-4"/>*/}
                {/*    <span className="sr-only"> 关闭 </span>*/}
                {/*</Button>*/}
            </DialogContent>
        </Dialog>
    )
}

export default SettingsDialog
