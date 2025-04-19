import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent implements OnInit {

  @Input() tableData: any[] = [];
  @Input() tableHeader:any[] = [];
  @Output() buttonClickEvent: EventEmitter<any> = new EventEmitter<any>();

  allSelected: boolean = false;

  ngOnInit(): void {
  }

  
  toggleAll(): void {
    this.allSelected = !this.allSelected;
    this.tableData.forEach(member => member.isSelected = this.allSelected);
  }

  checkIfAllSelected(): void {
    this.allSelected = this.tableData.every(member => member.isSelected);
  }

  emitRowData(index: number, member:any, buttonName:string){
   this.buttonClickEvent.emit({index:index,member:member, buttonName:buttonName})
  }


}
