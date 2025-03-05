import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

const ThemeSettings = () => {
    return (
        <div className="mt-0 space-y-6">
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
        </div>
    );
};

export default ThemeSettings;
