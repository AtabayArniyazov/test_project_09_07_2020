export interface ColumnDefs {
  headerName: string;
  field: string;
  cellRenderer?: any;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface VideoItem {
  image: Image;
  publishedOn: Date;
  title: {title: string, videoId: string};
  description: string;
}
