export type Actions={
    type:string,
    payload:InitialState
}

export interface InitialState {
    videos:HomePageVideos[],
    nextpageToken:string,
}

export interface HomePageVideos {
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
    recommendedVideos:RecommendedVideos,
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
export interface RecommendedVideos{}