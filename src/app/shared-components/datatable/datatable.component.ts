import { Component, Input, WritableSignal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { UserDataTableType } from '../../admin-panel/admin-panel.component';
import { Observable } from 'rxjs';

export interface ColumnDef<T> {
  header: string;
  name: Extract<keyof T, string>;
  type: 'text' | 'checkbox';
}

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, CommonModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
})
export class DatatableComponent<T> {
  @Input() columns!: ColumnDef<T>[];
  @Input() data!: WritableSignal<T[]>;
  @Input() handleTablePost?: (data: WritableSignal<T[]>) => void;

  getColumnNames(): string[] {
    return this.columns.map((col) => col.name as string);
  }

  onCheckboxChange(element: T, columnName: string, checked: boolean): void {
    const updatedData = this.data();

    const updatedDataWithCheckbox = updatedData.map((item) =>
      item === element ? { ...item, [columnName]: checked } : item,
    );

    this.data.set(updatedDataWithCheckbox);
  }

  onPostClick(): void {
    if (this.handleTablePost) {
      this.handleTablePost(this.data);
    }
  }
}
