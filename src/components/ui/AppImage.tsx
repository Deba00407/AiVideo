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
import { FileType } from "../../../types"

interface AppImageProps {
    data: FileType
}

export function AppImage({ data }: AppImageProps) {
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
            <div className="relative aspect-square bg-muted overflow-hidden">
                {data.fileURL ? (
                    <img
                        src={data.fileURL}
                        alt={data.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <div className="text-center">
                            <div className="h-12 w-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Eye className="h-6 w-6 text-primary/60" />
                            </div>
                            <p className="text-sm text-muted-foreground">No image</p>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {data.category && (
                    <Badge variant="secondary" className="absolute top-3 left-3">
                        {data.category}
                    </Badge>
                )}

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Full Size</DropdownMenuItem>
                            <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Download</DropdownMenuItem>
                            <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
                            <DropdownMenuItem><Heart className="mr-2 h-4 w-4" /> Like</DropdownMenuItem>
                            <DropdownMenuItem><Bookmark className="mr-2 h-4 w-4" /> Save</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between items-center">
                        <Button variant="secondary" size="sm"><Eye className="mr-2 h-4 w-4" /> View</Button>
                        <div className="flex space-x-1">
                            <Button variant="secondary" size="sm" className="h-8 w-8 p-0"><Share2 className="h-4 w-4" /></Button>
                            <Button variant="secondary" size="sm" className="h-8 w-8 p-0"><Download className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>
            </div>

            <CardContent className="p-4">
                <div className="space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {data.title || "Untitled Image"}
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
