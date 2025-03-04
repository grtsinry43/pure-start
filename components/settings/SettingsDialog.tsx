"use client"

import {useState} from "react"
import {
    Layout,
    Palette,
    Grid,
    Clock,
    CloudRainWindIcon as Weather,
    Bookmark,
    Search,
    SettingsIcon, Info, Star,
    Image as ImageIcon,
    Users, MessageSquare, Mail, Twitter, Github, Heart, ExternalLink, LinkIcon
} from 'lucide-react'
import logoUrl from '@/assets/logo.png';
import Image from "next/image";

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label"
import {Slider} from "@/components/ui/slider"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
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
import {Badge} from "@/components/ui/badge";
import Link from "next/link";

const SettingsDialog = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [activeTab, setActiveTab] = useState("appearance")
    const [isOpen, setIsOpen] = useState(false)

    const appearance = useAppSelector(state => state.appearance)
    const clock = useAppSelector(state => state.clock)
    const search = useAppSelector(state => state.search)
    const background = useAppSelector(state => state.background)

    const dispatch = useAppDispatch();

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle("dark")
    }

    const navigationItems = [
        {icon: <Layout className="h-4 w-4"/>, label: "外观", value: "appearance"},
        {icon: <Palette className="h-4 w-4"/>, label: "主题", value: "theme"},
        {icon: <Grid className="h-4 w-4"/>, label: "布局", value: "layout"},
        {icon: <ImageIcon className="h-4 w-4"/>, label: "背景", value: "background"},
        {icon: <Clock className="h-4 w-4"/>, label: "时钟", value: "clock"},
        {icon: <Weather className="h-4 w-4"/>, label: "天气", value: "weather"},
        {icon: <Bookmark className="h-4 w-4"/>, label: "书签", value: "bookmarks"},
        {icon: <Search className="h-4 w-4"/>, label: "搜索", value: "search"},
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

                <div className={`${isDarkMode ? "dark" : ""}`}>
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
                                {/*    }*/}
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
                                                <div>
                                                    <h2 className="text-lg font-semibold"> 外观 </h2>
                                                    <p className="text-sm text-muted-foreground"> 自定义起始页的外观和感觉 </p>
                                                </div>

                                                <div className="grid gap-6">
                                                    <Card className="border rounded-lg shadow-sm bg-background/50">
                                                        <CardContent className="p-6">
                                                            <div className="space-y-6">
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="theme-mode"
                                                                               className="font-medium"> 深色模式跟随系统 </Label>
                                                                        <Switch
                                                                            id="theme-mode"
                                                                            checked={appearance.isDarkModeFollowSystem}
                                                                            onCheckedChange={(checked) => {
                                                                                dispatch({
                                                                                    type: 'appearanceSettings/changeDarkModeFollowSystem',
                                                                                    payload: checked
                                                                                })
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        让起始页的外观跟随系统的深色模式设置
                                                                    </p>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="theme-mode"
                                                                               className="font-medium"> 深色模式 {
                                                                            appearance.isDarkModeFollowSystem ? " [disabled]" : ""
                                                                        } </Label>
                                                                        <Switch
                                                                            id="theme-mode"
                                                                            checked={isDarkMode}
                                                                            onCheckedChange={() => {
                                                                                toggleTheme()
                                                                                dispatch({
                                                                                    type: 'appearanceSettings/changeDarkMode',
                                                                                    payload: !isDarkMode
                                                                                })
                                                                            }}
                                                                            disabled={appearance.isDarkModeFollowSystem}
                                                                        />
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        启用深色模式以减少眼睛疲劳，适合夜间使用 {appearance.isDarkModeFollowSystem ? "，当前已跟随系统" : ""}
                                                                    </p>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label className="font-medium"> 主题颜色 </Label>
                                                                    <div className="grid grid-cols-5 gap-3">
                                                                        {[
                                                                            "bg-blue-500",
                                                                            "bg-purple-500",
                                                                            "bg-pink-500",
                                                                            "bg-orange-500",
                                                                            "bg-green-500"
                                                                        ].map((color, i) => (
                                                                            <div
                                                                                key={i}
                                                                                className={`${color} h-10 w-full rounded-md cursor-pointer ring-offset-background transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${i === 0 ? "ring-2 ring-ring ring-offset-2" : ""}`}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        在这里选择您喜欢的主题颜色
                                                                    </p>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label htmlFor="font-size"
                                                                           className="font-medium"> 字体大小 </Label>
                                                                    <div className="flex items-center gap-4">
                                                                        <span className="text-sm"> 小 </span>
                                                                        <Slider defaultValue={[50]} max={100} step={1}
                                                                                value={[appearance.fontSize]}
                                                                                onValueChange={(value) => {
                                                                                    dispatch({
                                                                                        type: 'appearanceSettings/changeFontSize',
                                                                                        payload: value
                                                                                    })
                                                                                }}
                                                                                className="flex-1"/>
                                                                        <span className="text-sm"> 大 </span>
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        调整界面文字的大小以提高可读性
                                                                    </p>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="animation"
                                                                               className="font-medium"> 动画效果 </Label>
                                                                        <Switch id="animation"
                                                                                checked={!appearance.isAnimationDisabled}
                                                                                onCheckedChange={(checked) => {
                                                                                    dispatch({
                                                                                        type: 'appearanceSettings/changeAnimationDisabled',
                                                                                        payload: !checked
                                                                                    })
                                                                                }}
                                                                        />
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        启用平滑过渡和动画效果
                                                                    </p>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="animation"
                                                                               className="font-medium"> 模糊效果 </Label>
                                                                        <Switch id="animation"
                                                                                checked={!appearance.isBlurDisabled}
                                                                                onCheckedChange={(checked) => {
                                                                                    dispatch({
                                                                                        type: 'appearanceSettings/changeBlurDisabled',
                                                                                        payload: !checked
                                                                                    })
                                                                                }}
                                                                        />
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        启用背景模糊效果以减少干扰和提升用户体验，如果感到卡顿请关闭
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="layout" className="mt-0 space-y-6">
                                                <div>
                                                    <h2 className="text-lg font-semibold"> 布局 </h2>
                                                    <p className="text-sm text-muted-foreground"> 自定义起始页的布局和排列 </p>
                                                </div>

                                                <div className="grid gap-6">
                                                    <Card className="border rounded-lg shadow-sm bg-background/50">
                                                        <CardContent className="p-6">
                                                            <div className="space-y-6">
                                                                <div className="space-y-3">
                                                                    <Label className="font-medium"> 布局类型 </Label>
                                                                    <RadioGroup defaultValue="grid"
                                                                                className="grid gap-3">
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="grid" id="grid"/>
                                                                            <Label htmlFor="grid"
                                                                                   className="flex-1 cursor-pointer"> 网格布局 </Label>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="list" id="list"/>
                                                                            <Label htmlFor="list"
                                                                                   className="flex-1 cursor-pointer"> 列表布局 </Label>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="minimal"
                                                                                            id="minimal"/>
                                                                            <Label htmlFor="minimal"
                                                                                   className="flex-1 cursor-pointer"> 极简布局 </Label>
                                                                        </div>
                                                                    </RadioGroup>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label htmlFor="columns"
                                                                           className="font-medium"> 网格列数 </Label>
                                                                    <Select defaultValue="4">
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="选择列数"/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="3">3 列 </SelectItem>
                                                                            <SelectItem value="4">4 列 </SelectItem>
                                                                            <SelectItem value="5">5 列 </SelectItem>
                                                                            <SelectItem value="6">6 列 </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label htmlFor="spacing"
                                                                           className="font-medium"> 元素间距 </Label>
                                                                    <div className="flex items-center gap-4">
                                                                        <span className="text-sm"> 紧凑 </span>
                                                                        <Slider defaultValue={[50]} max={100} step={1}
                                                                                className="flex-1"/>
                                                                        <span className="text-sm"> 宽松 </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="background" className="mt-0 space-y-6">
                                                <div>
                                                    <h2 className="text-lg font-semibold"> 背景 </h2>
                                                    <p className="text-sm text-muted-foreground"> 自定义起始页的背景 </p>
                                                </div>

                                                <div className="grid gap-6">
                                                    <Card className="border rounded-lg shadow-sm bg-background/50">
                                                        <CardContent className="p-6">
                                                            <div className="space-y-6">
                                                                <div className="space-y-3">
                                                                    <Label className="font-medium"> 背景类型 </Label>
                                                                    <RadioGroup defaultValue="image"
                                                                                className="grid gap-3">
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="color" id="color"/>
                                                                            <Label htmlFor="color"
                                                                                   className="flex-1 cursor-pointer"> 纯色 </Label>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="gradient"
                                                                                            id="gradient"/>
                                                                            <Label htmlFor="gradient"
                                                                                   className="flex-1 cursor-pointer"> 渐变色 </Label>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="image" id="image"/>
                                                                            <Label htmlFor="image"
                                                                                   className="flex-1 cursor-pointer"> 图片 </Label>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="daily" id="daily"/>
                                                                            <Label htmlFor="daily"
                                                                                   className="flex-1 cursor-pointer"> 每日图片 </Label>
                                                                        </div>
                                                                    </RadioGroup>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label htmlFor="bg-image"
                                                                           className="font-medium"> 背景图片 </Label>
                                                                    <div className="grid gap-3">
                                                                        <Input
                                                                            id="bg-image"
                                                                            placeholder="输入图片链接或上传图片"
                                                                            defaultValue="https://dogeoss.grtsinry43.com/volantis-static/media/wallpaper/minimalist/2020/006.webp"
                                                                        />
                                                                        <div className="flex gap-2">
                                                                            <Button variant="outline" size="sm"
                                                                                    className="flex-1">
                                                                                上传图片
                                                                            </Button>
                                                                            <Button variant="outline" size="sm"
                                                                                    className="flex-1">
                                                                                浏览图库
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label htmlFor="blur"
                                                                           className="font-medium"> 背景模糊 </Label>
                                                                    <div className="flex items-center gap-4">
                                                                        <span className="text-sm"> 无 </span>
                                                                        <Slider defaultValue={[5]} max={20} step={1}
                                                                                className="flex-1"/>
                                                                        <span className="text-sm"> 强 </span>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label htmlFor="opacity"
                                                                           className="font-medium"> 背景不透明度 </Label>
                                                                    <div className="flex items-center gap-4">
                                                                        <span className="text-sm"> 透明 </span>
                                                                        <Slider defaultValue={[70]} max={100} step={1}
                                                                                className="flex-1"/>
                                                                        <span className="text-sm"> 不透明 </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="clock" className="mt-0 space-y-6">
                                                <div>
                                                    <h2 className="text-lg font-semibold"> 时钟设置 </h2>
                                                    <p className="text-sm text-muted-foreground"> 自定义时钟显示方式 </p>
                                                </div>

                                                <div className="grid gap-6">
                                                    <Card className="border rounded-lg shadow-sm  bg-background/50">
                                                        <CardContent className="p-6">
                                                            <div className="space-y-6">
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="show-clock"
                                                                               className="font-medium"> 显示时钟 </Label>
                                                                        <Switch id="show-clock"
                                                                                checked={clock.isClockShow}
                                                                                onCheckedChange={(checked) => {
                                                                                    dispatch({
                                                                                        type: 'clockSettings/changeClockShow',
                                                                                        payload: checked
                                                                                    })
                                                                                }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label className="font-medium"> 时钟格式 </Label>
                                                                    <RadioGroup defaultValue="24h"
                                                                                value={clock.clockFormat}
                                                                                onValueChange={(format) => {
                                                                                    dispatch({
                                                                                        type: 'clockSettings/changeClockFormat',
                                                                                        payload: format
                                                                                    })
                                                                                }}
                                                                                className="grid gap-3">
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="12h" id="12h"/>
                                                                            <Label htmlFor="12h"
                                                                                   className="flex-1 cursor-pointer">12
                                                                                小时制 (AM/PM)</Label>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="24h" id="24h"/>
                                                                            <Label htmlFor="24h"
                                                                                   className="flex-1 cursor-pointer">24
                                                                                小时制 </Label>
                                                                        </div>
                                                                    </RadioGroup>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="show-seconds"
                                                                               className="font-medium"> 显示秒数 </Label>
                                                                        <Switch id="show-seconds"
                                                                                checked={clock.isSecondShow}
                                                                                onCheckedChange={(checked) => {
                                                                                    dispatch({
                                                                                        type: 'clockSettings/changeSecondShow',
                                                                                        payload: checked
                                                                                    })
                                                                                }}/>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="show-date"
                                                                               className="font-medium"> 显示日期 </Label>
                                                                        <Switch id="show-date" defaultChecked/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="weather" className="mt-0 space-y-6">
                                                <div>
                                                    <h2 className="text-lg font-semibold"> 天气设置 </h2>
                                                    <p className="text-sm text-muted-foreground"> 自定义天气显示 </p>
                                                </div>

                                                <div className="grid gap-6">
                                                    <Card className="border rounded-lg shadow-sm  bg-background/50">
                                                        <CardContent className="p-6">
                                                            <div className="space-y-6">
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="show-weather"
                                                                               className="font-medium"> 显示天气 </Label>
                                                                        <Switch id="show-weather" defaultChecked/>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label htmlFor="weather-unit"
                                                                           className="font-medium"> 温度单位 </Label>
                                                                    <Select defaultValue="celsius">
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="选择温度单位"/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="celsius"> 摄氏度
                                                                                (°C)</SelectItem>
                                                                            <SelectItem value="fahrenheit"> 华氏度
                                                                                (°F)</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label htmlFor="weather-location"
                                                                           className="font-medium"> 天气位置 </Label>
                                                                    <div className="grid gap-2">
                                                                        <Input id="weather-location"
                                                                               placeholder="城市名称"
                                                                               defaultValue="北京"/>
                                                                        <Button variant="outline" size="sm">
                                                                            使用当前位置
                                                                        </Button>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="show-forecast"
                                                                               className="font-medium"> 显示天气预报 </Label>
                                                                        <Switch id="show-forecast" defaultChecked/>
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        显示未来几天的天气预报
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="search" className="mt-0 space-y-6">
                                                <div>
                                                    <h2 className="text-lg font-semibold"> 搜索设置 </h2>
                                                    <p className="text-sm text-muted-foreground"> 自定义搜索功能 </p>
                                                </div>

                                                <div className="grid gap-6">
                                                    <Card className="border rounded-lg shadow-sm bg-background/50">
                                                        <CardContent className="p-6">
                                                            <div className="space-y-6">
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="show-search"
                                                                               className="font-medium"> 显示搜索栏 </Label>
                                                                        <Switch id="show-search"
                                                                                checked={search.isSearchBarShow}
                                                                                onCheckedChange={(checked) => {
                                                                                    dispatch({
                                                                                        type: 'searchSettings/changeSearchBarShow',
                                                                                        payload: checked
                                                                                    })
                                                                                }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label htmlFor="search-engine"
                                                                           className="font-medium"> 默认搜索引擎 </Label>
                                                                    <Select value={search.defaultSearchEngine}
                                                                            onValueChange={(select) => {
                                                                                dispatch({
                                                                                    type: 'searchSettings/changeDefaultSearchEngine',
                                                                                    payload: select
                                                                                })
                                                                            }}
                                                                    >
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="选择搜索引擎"/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {
                                                                                search.searchEngineList.map((engine) => (
                                                                                    <SelectItem
                                                                                        key={engine.url}
                                                                                        value={engine.name}>
                                                                                        {engine.name}
                                                                                    </SelectItem>
                                                                                ))
                                                                            }
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="search-suggestions"
                                                                               className="font-medium"> 搜索建议 </Label>
                                                                        <Switch id="search-suggestions"
                                                                                checked={search.isSuggestionsShow}
                                                                                onCheckedChange={(checked) => {
                                                                                    dispatch({
                                                                                        type: 'searchSettings/changeSuggestionsShow',
                                                                                        payload: checked
                                                                                    })
                                                                                }}
                                                                        />
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        在输入时显示搜索建议
                                                                    </p>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="search-history"
                                                                               className="font-medium"> 保存搜索历史 </Label>
                                                                        <Switch id="search-history"
                                                                                checked={search.isSaveSearchHistory}
                                                                                onCheckedChange={(checked) => {
                                                                                    dispatch({
                                                                                        type: 'searchSettings/changeIsSaveSearchHistory',
                                                                                        payload: checked
                                                                                    })
                                                                                }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="bookmarks" className="mt-0 space-y-6">
                                                <div>
                                                    <h2 className="text-lg font-semibold"> 书签设置 </h2>
                                                    <p className="text-sm text-muted-foreground"> 自定义快捷链接 </p>
                                                </div>

                                                <div className="grid gap-6">
                                                    <Card className="border rounded-lg shadow-sm bg-background/50">
                                                        <CardContent className="p-6">
                                                            <div className="space-y-6">
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label htmlFor="show-bookmarks"
                                                                               className="font-medium"> 显示书签 </Label>
                                                                        <Switch id="show-bookmarks" defaultChecked/>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label
                                                                        className="font-medium"> 书签显示方式 </Label>
                                                                    <RadioGroup defaultValue="icons"
                                                                                className="grid gap-3">
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="icons" id="icons"/>
                                                                            <Label htmlFor="icons"
                                                                                   className="flex-1 cursor-pointer"> 图标和文字 </Label>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="icons-only"
                                                                                            id="icons-only"/>
                                                                            <Label htmlFor="icons-only"
                                                                                   className="flex-1 cursor-pointer"> 仅图标 </Label>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                                                            <RadioGroupItem value="text" id="text"/>
                                                                            <Label htmlFor="text"
                                                                                   className="flex-1 cursor-pointer"> 仅文字 </Label>
                                                                        </div>
                                                                    </RadioGroup>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label className="font-medium"> 书签管理 </Label>
                                                                    <Button variant="outline" className="w-full">
                                                                        编辑书签
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="theme" className="mt-0 space-y-6">
                                                <div>
                                                    <h2 className="text-lg font-semibold"> 主题设置 </h2>
                                                    <p className="text-sm text-muted-foreground"> 自定义界面主题 </p>
                                                </div>

                                                <div className="grid gap-6">
                                                    <Card className="border rounded-lg shadow-sm bg-background/50">
                                                        <CardContent className="p-6">
                                                            <div className="space-y-6">
                                                                <div className="space-y-3">
                                                                    <Label className="font-medium"> 预设主题 </Label>
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        {[
                                                                            {
                                                                                name: "极简",
                                                                                color: "bg-white dark:bg-gray-900"
                                                                            },
                                                                            {name: "深邃", color: "bg-gray-900"},
                                                                            {name: "海洋", color: "bg-blue-600"},
                                                                            {name: "森林", color: "bg-green-700"},
                                                                        ].map((theme, i) => (
                                                                            <div
                                                                                key={i}
                                                                                className={`${i === 0 ? "ring-2 ring-primary" : ""} flex flex-col items-center justify-center h-24 rounded-lg border cursor-pointer hover:ring-2 hover:ring-primary transition-all`}
                                                                            >
                                                                                <div
                                                                                    className={`${theme.color} w-full h-12 rounded-t-lg`}></div>
                                                                                <div
                                                                                    className="p-2 text-center">{theme.name}</div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <Label className="font-medium"> 自定义颜色 </Label>
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        <div>
                                                                            <Label htmlFor="primary-color"
                                                                                   className="text-sm"> 主色调 </Label>
                                                                            <div className="flex mt-1">
                                                                                <div
                                                                                    className="w-10 h-10 rounded-l-md bg-primary"></div>
                                                                                <Input
                                                                                    id="primary-color"
                                                                                    defaultValue="#0284c7"
                                                                                    className="rounded-l-none"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Label htmlFor="accent-color"
                                                                                   className="text-sm"> 强调色 </Label>
                                                                            <div className="flex mt-1">
                                                                                <div
                                                                                    className="w-10 h-10 rounded-l-md bg-accent"></div>
                                                                                <Input
                                                                                    id="accent-color"
                                                                                    defaultValue="#f0f0f0"
                                                                                    className="rounded-l-none"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="info" className="mt-0 space-y-6">
                                                <div className="flex flex-col items-center text-center mb-6">
                                                    <div className="relative mb-4">
                                                        <Image
                                                            src={logoUrl}
                                                            alt="项目Logo"
                                                            width={200}
                                                            height={200}
                                                            className="rounded-xl"
                                                        />
                                                    </div>
                                                    <h1 className="text-2xl font-bold"> 摒弃繁杂，唯有纯粹 </h1>
                                                    <p className="text-sm text-muted-foreground max-w-md mt-2">
                                                        一个简洁、高效的起始页，使用现代化设计，帮助你专注于工作和学习
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2 justify-center">
                                                        <p className="text-[0.75em]"> 由 grtsinry43 筑之以 ❤️</p>
                                                        <Badge variant="secondary" className="text-xs">
                                                            版本 0.1.0
                                                        </Badge>
                                                        {/*<Badge variant="outline"*/}
                                                        {/*       className="text-xs flex items-center gap-1">*/}
                                                        {/*    <Star className="h-3 w-3"/> 4.8/5*/}
                                                        {/*</Badge>*/}
                                                    </div>
                                                </div>

                                                <div className="grid gap-6 md:grid-cols-2">
                                                    <Card className="border rounded-lg shadow-sm bg-background/50">
                                                        <CardHeader className="pb-3">
                                                            <div className="flex items-center gap-2">
                                                                <Users className="h-5 w-5 text-primary"/>
                                                                <h2 className="text-lg font-semibold"> 关于我 </h2>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p className="text-sm text-muted-foreground mb-4">
                                                                一个认真学习前端的大二学生，Java + JavaScript
                                                                全栈开发者，热爱设计和编程，希望能够创造一些有趣的东西
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    <span> 了解更多：</span>
                                                                    <Link href="https://blog.grtsinry43.com/about"
                                                                          target="_blank">
                                                                        <span
                                                                            className="text-primary hover:underline transition-colors">
                                                                            个人博客
                                                                        </span>
                                                                    </Link>
                                                                    <ExternalLink size={10}/>
                                                                </div>
                                                            </p>
                                                            <div className="flex flex-wrap gap-2">
                                                                <Badge
                                                                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"> 用户体验 </Badge>
                                                                <Badge
                                                                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"> 生产力工具 </Badge>
                                                                <Badge
                                                                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"> 全栈开发 </Badge>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className="border rounded-lg shadow-sm bg-background/50">
                                                        <CardHeader className="pb-3">
                                                            <div className="flex items-center gap-2">
                                                                <MessageSquare className="h-5 w-5 text-primary"/>
                                                                <h2 className="text-lg font-semibold"> 联系我 </h2>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-3">
                                                                <a
                                                                    href="mailto:grtsinry43@outlook.com"
                                                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                                                >
                                                                    <Mail className="h-4 w-4"/>
                                                                    <span>grtsinry43@outlook.com</span>
                                                                </a>
                                                                <a
                                                                    href="https://www.grtsinry43.com"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                                                >
                                                                    <LinkIcon className="h-4 w-4"/>
                                                                    <span> 我的个人主页 </span>
                                                                </a>
                                                                <a
                                                                    href="https://blog.grtsinry43.com"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                                                >
                                                                    <LinkIcon className="h-4 w-4"/>
                                                                    <span>Grtsinry43's Blog</span>
                                                                </a>
                                                                <a
                                                                    href="https://github.com/grtsinry43"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                                                >
                                                                    <Github className="h-4 w-4"/>
                                                                    <span>github.com/grtsinry43</span>
                                                                </a>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>

                                                <Card className="border rounded-lg shadow-sm bg-background/50">
                                                    <CardContent className="p-6">
                                                        <div
                                                            className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                            <div className="space-y-2">
                                                                <h3 className="font-semibold flex items-center gap-2">
                                                                    <Heart className="h-4 w-4 text-red-500"/>
                                                                    支持我
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground"> 如果您喜欢这个项目，还麻烦您给一个星标或分享给您的朋友 </p>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                <Button variant="outline" size="sm"
                                                                        className="flex items-center gap-1">
                                                                    <Github className="h-4 w-4"/>
                                                                    <span>Star</span>
                                                                </Button>
                                                                <Button variant="outline" size="sm"
                                                                        className="flex items-center gap-1">
                                                                    <ExternalLink className="h-4 w-4"/>
                                                                    <span> 分享 </span>
                                                                </Button>
                                                                {/*<Button variant="default" size="sm">*/}
                                                                {/*    支持我们 */}
                                                                {/*</Button>*/}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <div className="text-center text-xs text-muted-foreground mt-8">
                                                    <p>© 2025 grtsinry43. 保留所有权利.</p>
                                                    {/*<div className="flex items-center justify-center gap-4 mt-2">*/}
                                                    {/*    <a href="#" className="hover:text-primary transition-colors">*/}
                                                    {/*        隐私政策 */}
                                                    {/*    </a>*/}
                                                    {/*    <a href="#" className="hover:text-primary transition-colors">*/}
                                                    {/*        使用条款 */}
                                                    {/*    </a>*/}
                                                    {/*    <a href="#" className="hover:text-primary transition-colors">*/}
                                                    {/*        帮助中心 */}
                                                    {/*    </a>*/}
                                                    {/*</div>*/}
                                                </div>
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
                            <Button variant="outline"> 恢复默认 </Button>
                            <Button type="submit"> 完成更改 </Button>
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
