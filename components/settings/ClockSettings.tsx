import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";

const ClockSettings = () => {
    const clock = useAppSelector(state => state.clock)
    const dispatch = useAppDispatch();
    return (
        <div className="mt-0 space-y-6">
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
        </div>
    );
};

export default ClockSettings;
