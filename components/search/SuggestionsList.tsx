"use client"

import {useState, useEffect} from "react"
import {ArrowRight, Clock, Search} from "lucide-react"
import {useAppSelector} from "@/hooks/redux";
import debounce from "lodash.debounce";

interface SuggestionsListProps {
    searchValue: string
}

interface BingSuggestion {
    AS: {
        Query: string;
        FullResults: number;
        Results: {
            Type: string;
            Suggests: {
                Txt: string;
                Type: string;
                Sk: string;
                HCS: number;
            }[];
        }[];
    };
}

declare global {
    interface Window {
        [key: string]: (data: BingSuggestion) => void;
    }
}

export default function SuggestionsList({searchValue}: SuggestionsListProps) {
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [recentSearches, setRecentSearches] = useState<string[]>([])

    const search = useAppSelector(state => state.search)

    const onClickHandle = (value: string) => {
        if (value.trim()) {
            // 使用当前选择的搜索引擎
            const searchEngine = search.searchEngineList.find((engine) => engine.name === search.defaultSearchEngine)
            if (searchEngine) {
                window.open(`${searchEngine.url}${encodeURIComponent(value)}`, "_blank")
            } else {
                // fallback to Google search
                window.open(`https://www.google.com/search?q=${encodeURIComponent(value)}`, "_blank")
            }
        }
    }

    useEffect(() => {
        try {
            const saved = localStorage.getItem("recentSearches")
            if (saved) {
                setRecentSearches(JSON.parse(saved).slice(0, 5))
            }
        } catch (error) {
            console.error("Failed to load recent searches:", error)
        }
    }, [])

    // 感谢古早前端工程师给予的 JSONP 解决方案！！
    useEffect(() => {
        const fetchSuggestions = debounce((searchValue: string) => {
            if (!searchValue.trim()) {
                setSuggestions([]);
                return;
            }

            const callbackName = `jsonpCallback_${Date.now()}`;

            window[callbackName] = (data: BingSuggestion) => {
                if (data && data.AS && data.AS.Results) {
                    const suggestions = data.AS.Results.flatMap(result => result.Suggests.map(suggest => suggest.Txt));
                    setSuggestions(suggestions.slice(0, 8));
                } else {
                    setSuggestions([]);
                }

                if (script.parentNode) {
                    document.body.removeChild(script);
                }
                delete window[callbackName];
            };

            const script = document.createElement("script");
            script.src = `https://api.bing.com/qsonhs.aspx?type=cb&q=${encodeURIComponent(searchValue)}&cb=${callbackName}`;
            script.onerror = () => {
                console.error("JSONP request failed");
                if (script.parentNode) {
                    document.body.removeChild(script);
                }
                delete window[callbackName];
            };

            document.body.appendChild(script);

            return () => {
                if (script.parentNode) {
                    document.body.removeChild(script);
                }
                delete window[callbackName];
            };
        }, 300);

        fetchSuggestions(searchValue);

        return () => {
            fetchSuggestions.cancel();
        };
    }, [searchValue]);

    const saveToRecent = (term: string) => {
        if (!search.isSaveSearchHistory) {
            return;
        }
        try {
            const saved = localStorage.getItem("recentSearches")
            let searches = saved ? JSON.parse(saved) : []
            searches = searches.filter((s: string) => s !== term)
            searches.unshift(term)
            searches = searches.slice(0, 5)
            localStorage.setItem("recentSearches", JSON.stringify(searches))
            setRecentSearches(searches)
        } catch (error) {
            console.error("Failed to save recent search:", error)
        }
    }

    const clearRecentSearches = () => {
        try {
            localStorage.removeItem("recentSearches")
            setRecentSearches([])
        } catch (error) {
            console.error("Failed to clear recent searches:", error)
        }
    }


    const highlightMatch = (text: string, query: string) => {
        if (!query) return text

        const index = text.toLowerCase().indexOf(query.toLowerCase())
        if (index === -1) return text

        const before = text.substring(0, index)
        const match = text.substring(index, index + query.length)
        const after = text.substring(index + query.length)

        return (
            <>
                {before}
                <span className="font-medium text-white">{match}</span>
                {after}
            </>
        )
    }

    if (!searchValue.trim()) {
        if (!search.isSaveSearchHistory) {
            return (
                <div className="p-3 absolute bg-background/20 w-full backdrop-blur-sm rounded-md shadow-lg mt-4">
                    <div className="text-center py-4 text-white/60 text-sm">
                        搜索历史记录功能已关闭
                    </div>
                </div>
            )
        }

        if (recentSearches.length === 0) {
            return (
                <div className="p-3 absolute bg-background/20 w-full backdrop-blur-sm rounded-md shadow-lg mt-4">
                    <div className="text-center py-4 text-white/60 text-sm"> 没有最近搜索记录</div>
                </div>
            )
        }

        return (
            <div className="p-3 absolute bg-background/20 w-full backdrop-blur-sm rounded-md shadow-lg mt-4 z-50">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-white/70"> 最近搜索 </h3>
                    <button onClick={clearRecentSearches}
                            className="text-xs text-white/50 hover:text-white/80 transition-colors">
                        清除
                    </button>
                </div>
                <div className="space-y-1">
                    {recentSearches.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center px-3 py-2 rounded-lg hover:bg-white/20 cursor-pointer group transition-colors"
                            onClick={() => {
                                onClickHandle(item)
                                saveToRecent(item)
                            }}
                        >
                            <Clock className="h-3.5 w-3.5 text-white/60 mr-2 flex-shrink-0"/>
                            <span className="text-sm text-white/80 flex-1">{item}</span>
                            <ArrowRight
                                className="h-3.5 w-3.5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity"/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (!search.isSuggestionsShow) {
        return null
    }

    return (
        <div className="p-3 bg-background/10 backdrop-blur-sm rounded-lg mt-4 absolute w-full z-50">
            <div className="space-y-1">
                {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-center px-3 py-2 rounded-lg hover:bg-white/20 cursor-pointer group transition-colors"
                            onClick={() => {
                                onClickHandle(suggestion)
                                saveToRecent(suggestion)
                            }}
                        >
                            <Search className="h-3.5 w-3.5 text-white/60 mr-2 flex-shrink-0"/>
                            <div
                                className="text-sm text-white/80 flex-1">{highlightMatch(suggestion, searchValue)}</div>
                            <ArrowRight
                                className="h-3.5 w-3.5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity"/>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4 text-white/60 text-sm"> 没有找到相关结果 </div>
                )}
            </div>
        </div>
    )
}

