import { IVideo } from "@/models/Video"

export type VideoFormData = Omit<IVideo, 'key1' | 'key2'>

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    body?: any
    headers?: Record<string, string>
       
}

class ApiClient{
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T>{
        const { method = "GET", body, headers = {} } = options
        
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        })

        if (!response.ok) {
            throw new Error(await response.text())
        }
        return response.json();
    }

   // ...existing code...
    async getVideos() {
        return this.fetch('/auth/video');
    }

    async createVideo(videoData: VideoFormData) {
        return this.fetch('/auth/video', {
            method: "POST",
            body: videoData,
        });
// ...existing code...
    }
}

export const apiClient = new ApiClient()