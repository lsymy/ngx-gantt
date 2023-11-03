import { Component, HostBinding, Input, OnInit } from '@angular/core';

export const defaultColumnWidth = 100;
export const minColumnWidth = 80;

@Component({
    selector: 'table-header',
    templateUrl: './table-header.component.html',
    styleUrls: ['../table.scss']
})
export class TableHeaderComponent implements OnInit {
    public tableWidth = 0;

    // @Input() columns: QueryList<NgxGanttTableColumnComponent>;
    @Input() columns: [];

    @HostBinding('class') className = `gantt-table-header `;

    constructor() {}

    ngOnInit() {}
}
