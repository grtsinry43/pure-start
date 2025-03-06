import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
// import {Input} from "@/components/ui/input";
// import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";

const WeatherSettings = () => {
    const weather = useAppSelector(state => state.weather)
    const dispatch = useAppDispatch();
    return (
        <div className="mt-0 space-y-6">
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
                                    <Switch id="show-weather"
                                            checked={weather.showWeather}
                                            onCheckedChange={(checked) => {
                                                dispatch({
                                                    type: 'weatherSettings/changeShowWeather',
                                                    payload: checked
                                                })
                                            }}
                                    />
                                </div>
                            </div>

                            {/*<div className="space-y-3">*/}
                            {/*    <Label htmlFor="weather-unit"*/}
                            {/*           className="font-medium"> 温度单位 </Label>*/}
                            {/*    <Select defaultValue="celsius">*/}
                            {/*        <SelectTrigger className="w-full">*/}
                            {/*            <SelectValue placeholder="选择温度单位"/>*/}
                            {/*        </SelectTrigger>*/}
                            {/*        <SelectContent>*/}
                            {/*            <SelectItem value="celsius"> 摄氏度 */}
                            {/*                (°C)</SelectItem>*/}
                            {/*            <SelectItem value="fahrenheit"> 华氏度 */}
                            {/*                (°F)</SelectItem>*/}
                            {/*        </SelectContent>*/}
                            {/*    </Select>*/}
                            {/*</div>*/}

                            {/*<div className="space-y-3">*/}
                            {/*    <Label htmlFor="weather-location"*/}
                            {/*           className="font-medium"> 天气位置 </Label>*/}
                            {/*    <div className="grid gap-2">*/}
                            {/*        <Input id="weather-location"*/}
                            {/*               placeholder="城市名称"*/}
                            {/*               defaultValue="北京"/>*/}
                            {/*        <Button variant="outline" size="sm">*/}
                            {/*            使用当前位置 */}
                            {/*        </Button>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<div className="space-y-3">*/}
                            {/*    <div className="flex items-center justify-between">*/}
                            {/*        <Label htmlFor="show-forecast"*/}
                            {/*               className="font-medium"> 显示天气预报 </Label>*/}
                            {/*        <Switch id="show-forecast" defaultChecked/>*/}
                            {/*    </div>*/}
                            {/*    <p className="text-sm text-muted-foreground">*/}
                            {/*        显示未来几天的天气预报 */}
                            {/*    </p>*/}
                            {/*</div>*/}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WeatherSettings;
