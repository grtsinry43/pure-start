"use client"

import {useEffect, useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {
    Sun,
    Cloud,
    CloudRain,
    CloudSnow,
    CloudFog,
    CloudLightning,
    Thermometer,
    Droplets,
    Wind,
    Eye,
    Gauge,
} from "lucide-react"
import {cn} from "@/lib/utils"

export interface WeatherData {
    code: string
    updateTime: string
    now: {
        obsTime: string
        temp: string
        feelsLike: string
        icon: string
        text: string
        wind360: string
        windDir: string
        windScale: string
        windSpeed: string
        humidity: string
        precip: string
        pressure: string
        vis: string
        cloud: string
        dew: string
    }
}

interface WeatherIndicatorProps {
    className?: string
}

export function WeatherIndicator({className}: WeatherIndicatorProps) {
    const [showDetails, setShowDetails] = useState(false)

    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [cityId, setCityId] = useState();
    const [city, setCity] = useState();

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [qwtoken, setQwtoken] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
            console.log("Starting geolocation");
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    console.log("Coordinates obtained", position.coords.latitude, position.coords.longitude);
                    // Fetch city id using the obtained coordinates
                    fetch("/api/token", {
                        method: "POST",
                    }).then(res => res.json()).then(data => {
                        console.log(data);
                        setQwtoken(data.token);
                    }).catch(error => {
                        console.error("Error fetching token: ", error);
                    });
                },
                (error: GeolocationPositionError) => {
                    console.error("Error getting geolocation: ", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        if (qwtoken && latitude && longitude) {
            fetch(
                `https://geoapi.qweather.com/v2/city/lookup?location=${longitude.toFixed(2)},${latitude.toFixed(2)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${qwtoken}`,
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    setCityId(data.location[0].id);
                    setCity(data.location[0].name);
                })
                .catch((error) => {
                    console.error("Error getting city id: ", error);
                });
        }
    }, [qwtoken, latitude, longitude]);

    useEffect(() => {
        if (cityId && qwtoken) {
            fetch(
                `https://devapi.qweather.com/v7/weather/now?location=${cityId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${qwtoken}`,
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setWeatherData(data);
                })
                .catch((error) => {
                    console.error("Error getting weather data: ", error);
                });
        }
    }, [cityId, qwtoken]);

    // 获取天气图标
    const getWeatherIcon = (iconCode: string, text: string) => {
        // 根据图标代码或文本返回对应的图标
        if (iconCode === "100" || text.includes("晴")) return <Sun className="text-yellow-400" size={16}/>
        if (text.includes("云") || text.includes("阴")) return <Cloud className="text-gray-300" size={16}/>
        if (text.includes("雨")) return <CloudRain className="text-blue-300" size={16}/>
        if (text.includes("雪")) return <CloudSnow className="text-blue-200" size={16}/>
        if (text.includes("雾") || text.includes("霾")) return <CloudFog className="text-gray-300" size={16}/>
        if (text.includes("雷")) return <CloudLightning className="text-purple-300" size={16}/>

        // 默认返回太阳图标
        return <Sun className="text-yellow-400" size={16}/>
    }

    if (!weatherData) {
        return (
            <span className="ml-4">天气加载中...</span>
        );
    }

    return (
        <div className={cn("relative inline-flex items-center", className)}>
            {/* 简洁天气指示器 */}
            <motion.div
                className="inline-flex items-center gap-1 cursor-pointer ml-2"
                whileHover={{scale: 1.05}}
                transition={{type: "spring", stiffness: 400, damping: 10}}
                onMouseEnter={() => setShowDetails(true)}
                onMouseLeave={() => setShowDetails(false)}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                // transition={{delay: 0.4, duration: 0.6}}
            >
                <motion.span
                    animate={{rotate: [0, 5, 0, -5, 0]}}
                    transition={{repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut"}}
                >
                    {getWeatherIcon(weatherData.now.icon, weatherData.now.text)}
                </motion.span>
                <span className="text-white/70">
          {city} {weatherData.now.temp}°C
        </span>
            </motion.div>

            {/* 详细信息浮动窗口 */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        className="absolute w-64 top-full left-0 mt-2 bg-background/60 backdrop-blur-sm rounded-lg shadow-lg p-3 z-10 text-xs"
                        initial={{opacity: 0, y: -5}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -5}}
                        transition={{duration: 0.2}}
                    >
                        <div className="grid grid-cols-2 gap-2 text-foreground/80">
                            <div className="flex items-center gap-1">
                                <Thermometer className="text-red-400" size={14}/>
                                <span> 体感: {weatherData.now.feelsLike}°C</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Wind className="text-blue-400" size={14}/>
                                <span>
                  {weatherData.now.windDir} {weatherData.now.windScale} 级
                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Droplets className="text-blue-400" size={14}/>
                                <span> 湿度: {weatherData.now.humidity}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Gauge className="text-gray-400" size={14}/>
                                <span> 气压: {weatherData.now.pressure}hPa</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="text-gray-400" size={14}/>
                                <span> 能见度: {weatherData.now.vis}km</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-foreground/50 text-[10px] mt-1">
                <span>
                    数据来源:{" "} 和风天气
                  更新于:{" "}
                    {new Date(weatherData.now.obsTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

