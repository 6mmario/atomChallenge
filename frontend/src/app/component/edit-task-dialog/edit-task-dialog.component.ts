import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskModel } from '../../models/TaskModel';

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class EditTaskDialogComponent {
  task: TaskModel;
  tipo: number;

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskModel, tipo: number }
  ) {
    this.task = { ...data.task };
    this.tipo = data.tipo;
  }

  guardar() {
    if (this.tipo === 1) {
      this.dialogRef.close(this.task);
    } else if (this.tipo === 2) {
      this.dialogRef.close({ confirmDelete: true });
    }
  }
}
