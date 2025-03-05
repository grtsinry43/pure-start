import React, {useState} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Slider} from "@/components/ui/slider";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";

const AppearanceSettings = () => {
    const appearance = useAppSelector(state => state.appearance)
    const dispatch = useAppDispatch();
    const [isDarkMode, setIsDarkMode] = useState(false)
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle("dark")
    }
    return (
        <div className="mt-0 space-y-6">
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
        </div>
    );
};

export default AppearanceSettings;
