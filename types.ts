export type Actions={
    type:string,
    payload:InitialState
}
export interface InitialState {
    videos:HomePageVideos[],
    nextpageToken:string,
    currentPlaying:CurrentlyPlaying | null,
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
export interface CurrentlyPlaying{}