import { Component, OnInit } from '@angular/core';
import { VideoItemService } from '../video-item/video-item.service';
import { ColumnDefs, VideoItem } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './agGrid.component.html',
  styleUrls: ['./agGrid.component.scss']
})
export class AgGridComponent implements OnInit {
  public columnDefs: Array<ColumnDefs>;
  public rowData: Array<VideoItem>;
  public defaultColDef = {
    flex: 1,
    autoHeight: true
  };

  constructor(private videoItem: VideoItemService) {
  }

  ngOnInit(): void {
    this.getData();
    this.columnDefs = [
      {
        headerName: '', field: 'image',
        cellRenderer: function (params) {
          return `<span>
                    <img src="${params.value.url}" alt="${params.value.url}" width="${params.value.width}"
                        height="${params.value.height}" style="padding-top: 15px">
                  </span>`;
        }
      },
      {headerName: 'Published on', field: 'publishedOn'},
      {
        headerName: 'Video Title', field: 'title',
        cellRenderer: function (params) {
          return `<span>
                    <a href="https://www.youtube.com/watch?v=${params.value.videoId}" target="_blank">${params.value.title}</a>
                  </span>`;
        }
      },
      {headerName: 'Description', field: 'description'}
    ];
  }

  private getData(): void {
    this.videoItem.getData().then((result) => {
      this.rowData = result;
    });
  }

}
