import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {toast} from "sonner";

const BackgroundSettings = () => {
    const background = useAppSelector(state => state.background)
    const dispatch = useAppDispatch();
    const [photoUrl, setPhotoUrl] = React.useState(background.photo.url);
    return (
        <div className="mt-0 space-y-6">
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
                                <RadioGroup value={background.backgroundType}
                                            onValueChange={(value) => {
                                                dispatch({
                                                    type: 'backgroundSettings/changeBackgroundType',
                                                    payload: value
                                                })
                                                toast("应用更改", {
                                                    description: "刷新页面以应用更改",
                                                    action: {
                                                        label: "重载",
                                                        onClick: () => {
                                                            location.reload();
                                                        },
                                                    },
                                                })
                                            }}
                                            className="grid gap-3">
                                    {/*<div*/}
                                    {/*    className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">*/}
                                    {/*    <RadioGroupItem value="color" id="color"/>*/}
                                    {/*    <Label htmlFor="color"*/}
                                    {/*           className="flex-1 cursor-pointer"> 纯色 </Label>*/}
                                    {/*</div>*/}
                                    {/*<div*/}
                                    {/*    className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">*/}
                                    {/*    <RadioGroupItem value="gradient"*/}
                                    {/*                    id="gradient"/>*/}
                                    {/*    <Label htmlFor="gradient"*/}
                                    {/*           className="flex-1 cursor-pointer"> 渐变色 </Label>*/}
                                    {/*</div>*/}
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
                                               className="flex-1 cursor-pointer"> 必应每日图片 </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            {
                                background.backgroundType === 'image' && (
                                    <div className="space-y-3">
                                        <Label htmlFor="bg-image"
                                               className="font-medium"> 背景图片 </Label>
                                        <div className="grid gap-3">
                                            <Input
                                                id="bg-image"
                                                placeholder="输入图片链接或上传图片"
                                                value={photoUrl}
                                                onChange={(e) => {
                                                    setPhotoUrl(e.target.value)
                                                }}
                                            />
                                            <Button variant="outline" size="sm"
                                                    onClick={() => {
                                                        dispatch({
                                                            type: 'backgroundSettings/changePhotoUrl',
                                                            payload: photoUrl
                                                        })
                                                        location.reload();
                                                    }}
                                            >
                                                点击此处应用图片并刷新
                                            </Button>
                                            {/*<div className="flex gap-2">*/}
                                            {/*    <Button variant="outline" size="sm"*/}
                                            {/*            className="flex-1">*/}
                                            {/*        上传图片 */}
                                            {/*    </Button>*/}
                                            {/*    <Button variant="outline" size="sm"*/}
                                            {/*            className="flex-1">*/}
                                            {/*        浏览图库 */}
                                            {/*    </Button>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                )
                            }


                            <div className="space-y-3">
                                <Label htmlFor="blur"
                                       className="font-medium"> 背景模糊 </Label>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm"> 无 </span>
                                    <Slider value={[background.backgroundBlur]} max={20} step={1}
                                            onValueChange={(value) => {
                                                dispatch({
                                                    type: 'backgroundSettings/changeBackgroundBlur',
                                                    payload: value
                                                })
                                            }}
                                            className="flex-1"/>
                                    <span className="text-sm"> 强 </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="opacity"
                                       className="font-medium"> 背景不透明度 </Label>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm"> 透明 </span>
                                    <Slider defaultValue={[background.backgroundOpacity]} max={100} step={1}
                                            onValueChange={(value) => {
                                                dispatch({
                                                    type: 'backgroundSettings/changeBackgroundOpacity',
                                                    payload: value
                                                })
                                            }}
                                            className="flex-1"/>
                                    <span className="text-sm"> 不透明 </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BackgroundSettings;
