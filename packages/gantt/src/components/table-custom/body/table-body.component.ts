import { Component, HostBinding, TemplateRef, QueryList, Input, OnInit, Output, EventEmitter, ViewChildren } from '@angular/core';
import {
    GanttItemInternal,
    GanttGroupInternal,
    GanttSelectedEvent,
    GanttTableDragEnterPredicateContext,
    GanttTableDragDroppedEvent,
    GanttTableDragStartedEvent,
    GanttTableDragEndedEvent
} from '../../../class';
import { NgxGanttTableColumnComponent } from '../../../table/gantt-column.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { GANTT_ABSTRACT_TOKEN, GanttAbstractComponent } from 'ngx-gantt/gantt-abstract';
@Component({
    selector: 'table-body',
    templateUrl: './table-body.component.html',
    styleUrls: ['../table.scss']
})
export class TableBodyComponent implements OnInit {
    @Input() viewportItems: { name: string; [key: string]: any }[];

    @Input() flatItems: (GanttGroupInternal | GanttItemInternal)[];

    @Input() columns: [];

    @Input() groupTemplate: TemplateRef<any>;

    @Input() emptyTemplate: TemplateRef<any>;

    @Input() rowBeforeTemplate: TemplateRef<any>;

    @Input() rowAfterTemplate: TemplateRef<any>;

    @HostBinding('class.gantt-table-draggable')
    @Input()
    draggable = false;

    @Input() dropEnterPredicate?: (context: GanttTableDragEnterPredicateContext) => boolean;

    @Output() dragDropped = new EventEmitter<GanttTableDragDroppedEvent>();

    @Output() dragStarted = new EventEmitter<GanttTableDragStartedEvent>();

    @Output() dragEnded = new EventEmitter<GanttTableDragEndedEvent>();

    @Output() itemClick = new EventEmitter<GanttSelectedEvent>();

    @HostBinding('class.gantt-table-body') ganttTableClass = true;

    @HostBinding('class.gantt-table-empty') ganttTableEmptyClass = false;

    @HostBinding('class.gantt-table-dragging') ganttTableDragging = false;

    @ViewChildren(CdkDrag<string>) cdkDrags: QueryList<CdkDrag<GanttItemInternal>>;

    public hasGroup: boolean;
    public hasExpandIcon: boolean = false;

    constructor() {}

    ngOnInit() {
        console.log(this.columns);
        console.log(this.viewportItems);
        this.handleData();
    }

    handleData() {
        let processedData = [];
        let lastItem = null;

        for (let item of this.viewportItems) {
            if (lastItem && item.name === lastItem.name) {
                lastItem.rowspan++;
                lastItem.items.push(item);
            } else {
                item.rowspan = 1;
                item.items = [item];
                processedData.push(item);
                lastItem = item;
            }
        }

        console.log(processedData);
        console.log(lastItem);
    }
}
