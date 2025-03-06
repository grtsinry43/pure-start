import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {BookmarkDialog} from "@/components/bookmark/BookmarkDialog";

const BookmarksSettings = () => {
    const bookmark = useAppSelector(state => state.bookmark);
    const dispatch = useAppDispatch();
    return (
        <div className="mt-0 space-y-6">
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
                                    <Switch id="show-bookmarks"
                                            checked={bookmark.showBookmark}
                                            onCheckedChange={(value) => {
                                                dispatch({
                                                    type: 'bookmarkSettings/changeShowBookmark',
                                                    payload: value
                                                })
                                            }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label
                                    className="font-medium"> 书签显示方式 </Label>
                                <RadioGroup defaultValue="icon-text"
                                            value={bookmark.bookmarkShowType}
                                            onValueChange={(value) => {
                                                dispatch({
                                                    type: 'bookmarkSettings/changeBookmarkShowType',
                                                    payload: value
                                                })
                                            }}
                                            className="grid gap-3">
                                    <div
                                        className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                        <RadioGroupItem value="icon-text" id="icon-text"/>
                                        <Label htmlFor="icon-text"
                                               className="flex-1 cursor-pointer"> 图标和文字 </Label>
                                    </div>
                                    <div
                                        className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                                        <RadioGroupItem value="icon"
                                                        id="icon"/>
                                        <Label htmlFor="icon"
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
                                {/*<Button variant="outline" className="w-full">*/}
                                {/*    编辑书签*/}
                                {/*</Button>*/}
                                <BookmarkDialog/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BookmarksSettings;
