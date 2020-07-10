import { Image, VideoItem } from '../@types';

export class VideoItemModel implements VideoItem {
  image: Image;
  publishedOn: Date;
  title: { title: string, videoId: string };
  description: string;
  videoId: string;

  constructor(optionals: Partial<VideoItem> = {}) {
    Object.assign(this, optionals);
  }

  static fromJSON(json): VideoItemModel {
    return new VideoItemModel({
      image: json.snippet.thumbnails.default,
      publishedOn: json.snippet.publishedAt,
      title: {title: json.snippet.title, videoId: json.id.videoId},
      description: json.snippet.description
    });
  }
}
