"use client"

import * as React from "react"
import {DragDropContext, Droppable, Draggable, DroppableProps, DropResult} from "react-beautiful-dnd"
import {Edit, Grip, Plus, Trash2, X} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ScrollArea} from "@/components/ui/scroll-area"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {BookmarkItem} from "@/store/bookmark";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";

// 定义书签表单验证模式
const bookmarkFormSchema = z.object({
    label: z.string().min(1, "书签名称不能为空"),
    url: z.string().url("请输入有效的URL"),
    category: z.string().min(1, "请选择分类"),
    icon: z.string().optional(),
})

type BookmarkFormValues = z.infer<typeof bookmarkFormSchema>

export function BookmarkDialog() {
    const dispatch = useAppDispatch()
    const {bookmarkList, categoryList} = useAppSelector((state) => state.bookmarkStore)
    const [open, setOpen] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState("bookmarks")
    const [editingBookmark, setEditingBookmark] = React.useState<BookmarkItem | null>(null)
    const [newCategory, setNewCategory] = React.useState("")

    const [localBookmarks, setLocalBookmarks] = React.useState<BookmarkItem[]>([])

    React.useEffect(() => {
        setLocalBookmarks([...bookmarkList].sort((a, b) => {
            return (a.sort ?? 0) - (b.sort ?? 0);
        }));
    }, [bookmarkList]);

    // 初始化表单
    const form = useForm<BookmarkFormValues>({
        resolver: zodResolver(bookmarkFormSchema),
        defaultValues: {
            label: "",
            url: "",
            category: categoryList[0] || "",
            icon: "",
        },
    })

    // 处理拖拽结束事件
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const items = [...localBookmarks]
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        const updatedItems = items.map((item, index) => ({
            ...item,
            sort: index,
        }))

        setLocalBookmarks(updatedItems)

        dispatch({
            type: "bookmarkStore/updateBookmarkList",
            payload: updatedItems,
        })
    }

    // 编辑书签
    const handleEditBookmark = (bookmark: BookmarkItem) => {
        setEditingBookmark(bookmark)
        form.reset({
            label: bookmark.label,
            url: bookmark.url,
            category: bookmark.category,
            icon: typeof bookmark.icon === "string" ? bookmark.icon : "",
        })
        setActiveTab("edit")
    }

    // 删除书签
    const handleDeleteBookmark = (bookmark: BookmarkItem) => {
        dispatch({
            type: "bookmarkStore/removeBookmark",
            payload: bookmark,
        })
    }

    // 添加新书签
    const handleAddBookmark = (data: BookmarkFormValues) => {
        if (editingBookmark) {
            dispatch({
                type: "bookmarkStore/updateBookmark",
                payload: {
                    ...editingBookmark,
                    ...data,
                },
            })
            setEditingBookmark(null)
        } else {
            dispatch({
                type: "bookmarkStore/addBookmark",
                payload: {
                    ...data,
                    sort: bookmarkList.length,
                },
            })
        }
        form.reset()
        setActiveTab("bookmarks")
    }

    // 添加新分类
    const handleAddCategory = () => {
        if (newCategory.trim() && !categoryList.includes(newCategory.trim())) {
            dispatch({
                type: "bookmarkStore/addCategory",
                payload: newCategory.trim(),
            })
            setNewCategory("")
        }
    }

    // 删除分类
    const handleDeleteCategory = (category: string) => {
        dispatch({
            type: "bookmarkStore/removeCategory",
            payload: category,
        })
    }

    const DroppableComponent = React.memo(function DroppableComponent({
                                                                          droppableId,
                                                                          children,
                                                                          ...props
                                                                      }: DroppableProps & { droppableId: string }) {
        return (
            <Droppable droppableId={droppableId} {...props}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {children(provided, snapshot)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full"> 管理书签 </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle> 书签管理 </DialogTitle>
                    <DialogDescription> 管理您的书签和分类，拖拽调整顺序。</DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="bookmarks"> 书签列表 </TabsTrigger>
                        <TabsTrigger value="edit">{editingBookmark ? "编辑书签" : "添加书签"}</TabsTrigger>
                        <TabsTrigger value="categories"> 分类管理 </TabsTrigger>
                    </TabsList>

                    <TabsContent value="bookmarks" className="mt-4">
                        <ScrollArea className="h-[400px] pr-4">
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <DroppableComponent droppableId="bookmarks">
                                    {() => (
                                        <>
                                            {localBookmarks.length === 0 ? (
                                                <div
                                                    className="flex h-20 items-center justify-center rounded-md border border-dashed">
                                                    <p className="text-sm text-muted-foreground"> 暂无书签，请添加 </p>
                                                </div>
                                            ) : (
                                                localBookmarks.map((bookmark, index) => (
                                                    <Draggable key={bookmark.url} draggableId={bookmark.url}
                                                               index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className="flex items-center justify-between rounded-md border p-3 bg-card"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div {...provided.dragHandleProps}
                                                                         className="cursor-grab">
                                                                        <Grip
                                                                            className="h-5 w-5 text-muted-foreground"/>
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                         <span
                                                                             className="font-medium">{bookmark.label}</span>
                                                                        <span
                                                                            className="text-xs text-muted-foreground truncate max-w-[300px]">
                                                {bookmark.url}
                                            </span>
                                                                        <span
                                                                            className="text-xs text-primary mt-1">{bookmark.category}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <Button variant="ghost" size="icon"
                                                                            onClick={() => handleEditBookmark(bookmark)}>
                                                                        <Edit className="h-4 w-4"/>
                                                                    </Button>
                                                                    <Button variant="ghost" size="icon"
                                                                            onClick={() => handleDeleteBookmark(bookmark)}>
                                                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            )}
                                        </>
                                    )}
                                </DroppableComponent>
                            </DragDropContext>
                        </ScrollArea>
                        <Button
                            className="mt-4 w-full"
                            onClick={() => {
                                setEditingBookmark(null)
                                form.reset({
                                    label: "",
                                    url: "",
                                    category: categoryList[0] || "",
                                    icon: "",
                                })
                                setActiveTab("edit")
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4"/> 添加新书签
                        </Button>
                    </TabsContent>

                    <TabsContent value="edit">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleAddBookmark)} className="space-y-4 mt-4">
                                <FormField
                                    control={form.control}
                                    name="label"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel> 书签名称 </FormLabel>
                                            <FormControl>
                                                <Input placeholder="输入书签名称" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://example.com" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel> 分类 </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="选择分类"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categoryList.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription> 选择书签所属的分类 </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="icon"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel> 图标 </FormLabel>
                                            <FormControl>
                                                <Input placeholder="输入图标名称或URL" {...field} />
                                            </FormControl>
                                            <FormDescription> 可以输入图标名称或图标 URL</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setActiveTab("bookmarks")}>
                                        取消
                                    </Button>
                                    <Button type="submit">{editingBookmark ? "更新" : "添加"}</Button>
                                </div>
                            </form>
                        </Form>
                    </TabsContent>

                    <TabsContent value="categories" className="mt-4">
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="输入新分类名称"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                <Button onClick={handleAddCategory}> 添加 </Button>
                            </div>

                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-2">
                                    {categoryList.length === 0 ? (
                                        <div
                                            className="flex h-20 items-center justify-center rounded-md border border-dashed">
                                            <p className="text-sm text-muted-foreground"> 暂无分类，请添加 </p>
                                        </div>
                                    ) : (
                                        categoryList.map((category) => (
                                            <div key={category}
                                                 className="flex items-center justify-between rounded-md border p-3">
                                                <span>{category}</span>
                                                <Button variant="ghost" size="icon"
                                                        onClick={() => handleDeleteCategory(category)}>
                                                    <X className="h-4 w-4 text-destructive"/>
                                                </Button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        关闭
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

