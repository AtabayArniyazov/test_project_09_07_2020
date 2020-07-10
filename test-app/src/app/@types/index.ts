export interface ColumnDefs {
  headerName: string;
  field: string;
  cellRenderer?: any;
  menuTabs?: Array<String>;
  headerCheckboxSelection?: boolean;
  checkboxSelection?: boolean;
  maxWidth?: number;
  hide?: boolean;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface VideoItem {
  image: Image;
  publishedOn: Date;
  title: { title: string, videoId: string };
  description: string;
}
