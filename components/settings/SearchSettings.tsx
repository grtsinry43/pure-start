import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";

const SearchSettings = () => {
    const search = useAppSelector(state => state.search)
    const dispatch = useAppDispatch();
    return (
        <div className="mt-0 space-y-6">
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
                                            disabled
                                            aria-disabled
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
        </div>
    );
};

export default SearchSettings;
