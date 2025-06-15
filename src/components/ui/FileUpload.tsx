"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { FileType } from "../../../types"

import { Upload, File, X, CheckCircle, Loader2 } from "lucide-react"

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";

import { useRef, useState } from "react";
import axios from "axios";

const uploadVideoRecord = async (data: FileType) => {
    try {
        await axios.post("/api/videos", data)
    } catch (error: any) {
        throw new Error("Error while saving to database:", error)
    }
}

const FileUpload = () => {
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const authenticator = async () => {
        try {
            const response = await axios.get("/api/upload-auth");
            const data = response.data;
            return data
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setProgress(0);
        setUploadComplete(false);
    };

    const handleReset = () => {
        setTitle('');
        setDescription('');
        setCategory('');
        setTags('');
        setSelectedFile(null);
        setProgress(0);
        setUploadComplete(false);
        setUploading(false);
    };

    const handleUpload = async () => {
        const file = selectedFile;
        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }

        const { signature, expire, token, publicKey } = authParams;

        try {
            setUploading(true);
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
            });

            const data: FileType = {
                title,
                description,
                tags: Array.from(tags.split(",")),
                fileURL: uploadResponse.url as string,
                thumbnailURL: (uploadResponse.thumbnailUrl ?? `${uploadResponse.url}/ik-thumbnail.jpg`) as string,
                category,
                controls: true,
                transformation: {
                    height: uploadResponse.height as number,
                    width: uploadResponse.width as number,
                }
            }

            await uploadVideoRecord(data)

            setUploadComplete(true);
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6 box-border p-3">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Upload File</h2>
                <p className="text-sm text-muted-foreground">
                    Fill in the details and upload your file
                </p>
            </div>

            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        placeholder="Enter file title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Enter file description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                        id="tags"
                        placeholder="Enter tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>File Upload</Label>
                    <p className="text-sm text-muted-foreground">
                        Choose a file to upload (Max 10MB)
                    </p>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                />

                <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                        {selectedFile ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-md">
                                        <File className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemoveFile}
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div
                                className="flex flex-col items-center justify-center py-8 cursor-pointer"
                                onClick={triggerFileSelect}
                            >
                                <div className="p-3 bg-primary/10 rounded-full mb-4">
                                    <Upload className="h-6 w-6 text-primary" />
                                </div>
                                <p className="text-sm font-medium mb-1">Click to upload a file</p>
                                <p className="text-xs text-muted-foreground">
                                    or drag and drop your file here
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {(uploading || uploadComplete) && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Upload Progress</span>
                                    <span className="text-muted-foreground">{progress.toFixed(0)}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                                {uploadComplete && (
                                    <div className="flex items-center space-x-2 text-sm text-green-600">
                                        <CheckCircle className="h-4 w-4" />
                                        <span>Upload completed successfully!</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <Separator />

            <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={handleReset}>
                    Reset
                </Button>
                <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading || !title.trim()}
                >
                    {uploading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload File
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default FileUpload;
