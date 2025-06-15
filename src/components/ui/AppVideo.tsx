import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Eye, Download, Share2, MoreHorizontal, Heart, Bookmark, Calendar, Tag
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Video } from "@imagekit/next"

import { FileType } from "../../../types"

interface AppVideoProps {
    data: FileType
}

export function AppVideo({ data }: AppVideoProps) {
    const formatDate = (date?: Date) => {
        if (!date) return "Unknown date"
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        })
    }

    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
                <div className="aspect-video bg-muted overflow-hidden relative">
                    {data.fileURL ? (
                        <Video
                            src={data.fileURL}
                            controls={data.controls}
                            poster={data.thumbnailURL}
                            transformation={[
                                {
                                    height: data.transformation?.height,
                                    width: data.transformation?.width,
                                    quality: data.transformation?.quality,
                                },
                            ]}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <div className="text-center">
                                <div className="h-12 w-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Eye className="h-6 w-6 text-primary/60" />
                                </div>
                                <p className="text-sm text-muted-foreground">No video</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="flex justify-between items-start">
                        {data.category && (
                            <Badge variant="secondary" className="pointer-events-auto">
                                {data.category}
                            </Badge>
                        )}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-8 w-8 p-0 pointer-events-auto"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="pointer-events-auto">
                                <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Watch Fullscreen</DropdownMenuItem>
                                <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Download</DropdownMenuItem>
                                <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
                                <DropdownMenuItem><Heart className="mr-2 h-4 w-4" /> Like</DropdownMenuItem>
                                <DropdownMenuItem><Bookmark className="mr-2 h-4 w-4" /> Save</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <CardContent className="p-4">
                <div className="space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {data.title || "Untitled Video"}
                    </h3>

                    {data.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {data.description}
                        </p>
                    )}

                    {data.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {data.tags.slice(0, 3).map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                    <Tag className="mr-1 h-3 w-3" />
                                    {tag}
                                </Badge>
                            ))}
                            {data.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{data.tags.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatDate(data.createdAt)}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm"><Heart className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Bookmark className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}