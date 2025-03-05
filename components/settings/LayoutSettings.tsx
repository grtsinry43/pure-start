import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Slider} from "@/components/ui/slider";

const LayoutSettings = () => {
    return (
        <div className="mt-0 space-y-6">
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
        </div>
    );
};

export default LayoutSettings;
