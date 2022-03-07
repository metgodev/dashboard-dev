import term from "../../../../../terms";

export const mediaUploadSections = [
    {
        title: term('upload_photo'),
        type: "image",
        fileTypes: ["JPG", "PNG", "GIF"],
    },
    {
        title: term('upload_video'),
        type: "video",
        fileTypes: ["MP4", "AVI", "WMV"],
    },
]