
export interface AppInitialState {
    videos:HomeAndSearchPageVideos[],
    nextpageToken:string,
}

export interface HomeAndSearchPageVideos {
    videoTitle:string,
    videoLink:string,
    videoDescription:string,
    videoThumbnail:string,
    videoDuration:string,
    videoViews:string,
    videoUploadedTime:string,
    videoId:string,
    channel:{
        id:string,
        name:string,
        image:string
    }
}

export interface SearchInitialState {
    searchTerm:string,
}

export interface WatchInitialState {
    currentPlaying:CurrentlyPlaying | null,
    similarCatagoriesVideoDetails:{
        nextPageToken:string,
        videos:SimilarCatagoryVideos[]
    },
}

export interface CurrentlyPlaying{
    videoTitle:string,
    videoDescription:string,
    videoViews:string,
    videoUploadedTime:string,
    videoId:string,
    videoLikes:string,
    channel:{
        id:string,
        name:string,
        image:string,
        subscribers:string,
    },
}

export interface SimilarCatagoryVideos{
    videoTitle:string,
    videoViews:string,
    videoUploadedTime:string,
    videoDuration:string,
    videoId:string,
    videoThumbnail:string,
    channel:{
        id:string,
        name:string,
    }
}