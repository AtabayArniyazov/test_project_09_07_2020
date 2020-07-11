import { Component, OnInit } from '@angular/core';
import { VideoItemService } from '../video-item/video-item.service';
import { ColumnDefs, VideoItem } from '../@types';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';

@Component({
  selector: 'app-home',
  templateUrl: './agGrid.component.html',
  styleUrls: ['./agGrid.component.scss']
})
export class AgGridComponent implements OnInit {
  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;
  public modules: any[] = [
    ClientSideRowModelModule,
    MenuModule
  ];
  public columnDefs: Array<ColumnDefs>;
  public rowData: Array<VideoItem>;
  public defaultColDef = {
    flex: 1,
    autoHeight: true
  };

  constructor(private videoItem: VideoItemService) {
  }

  public ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: '',
        field: 'checkBox',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        menuTabs: [],
        maxWidth: 50,
        hide: true
      },
      {
        headerName: '', field: 'image',
        menuTabs: ['generalMenuTab'],
        maxWidth: 154,
        cellRenderer: function (params) {
          return `<span>
                    <img src="${params.value.url}" alt="${params.value.url}" width="${params.value.width}"
                        height="${params.value.height}" style="padding-top: 15px">
                  </span>`;
        }
      },
      {headerName: 'Published on', field: 'publishedOn', menuTabs: []},
      {
        headerName: 'Video Title', field: 'title',
        menuTabs: [],
        cellRenderer: function (params) {
          return `<span>
                    <a href="https://www.youtube.com/watch?v=${params.value.videoId}" target="_blank">${params.value.title}</a>
                  </span>`;
        }
      },
      {headerName: 'Description', field: 'description', menuTabs: []}
    ];
  }

  private getData(): void {
    this.videoItem.getData().then((result: VideoItem[]) => {
      this.rowData = result;
    });
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getData();
  }

  public getMainMenuItems(params: any): any {
    if (params.column.getId() === 'image') {
      return [
        {
          name: 'Selection mode',
          action: function () {
            params.columnApi.setColumnVisible('checkBox', true);
          }
        },
        {
          name: `Total records: <b>${params.api.getDisplayedRowCount()}</b>`
        },
        {
          name: `Selected records: <b>${params.api.getSelectedRows().length}</b>`
        }
      ];
    } else {
      return params.defaultItems;
    }
  }

  public getContextMenuItems(params: any): any {
    if (params.column.getId() === 'title') {
      return [
        'copy',
        'copyWithHeaders',
        'paste',
        {
          name: 'Open in new tab',
          action: function () {
            window.open(`https://www.youtube.com/watch?v=${params.value.videoId}`, '_blank');
          }
        }
      ];
    }
  }
}
