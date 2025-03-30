import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/TaskModel';
import { DashboardService } from '../../service/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericResponse } from '../../models/authResponse';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  tasks: TaskModel[] = [];
  newTask: Partial<TaskModel> = {
    title: '',
    description: '',
    completed: false
  };
  email: string = '';

  constructor(
    private dashBoardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.loadTasks();
    });
  }

  loadTasks() {
    this.dashBoardService.getTasks(this.email).subscribe((res: GenericResponse<TaskModel[]>) => {
      this.tasks = this.tasks = (res.detalle || []).flat();
    });
  }

  addTask() {
    if (!this.newTask.title || !this.newTask.description) return;

    const taskToCreate: TaskModel = {
      ...this.newTask,
      email: this.email
    } as TaskModel;

    this.dashBoardService.createTask(taskToCreate).subscribe((res: GenericResponse<TaskModel>) => {
      this.newTask = { title: '', description: '' };
      this.loadTasks();
    });
  }

  toggleCompletion(task: TaskModel, checked: boolean) {
    console.table(task)
    this.dashBoardService.updateTask(task.id!, { completed: checked }).subscribe(() => {
      task.completed = task.completed;
      this.loadTasks();
    });
  }

  editTask(task: TaskModel, tipo: number) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: { ...task }
    });

    dialogRef.afterClosed().subscribe((updatedTask: TaskModel | undefined) => {
      if (updatedTask) {
        this.dashBoardService.updateTask(task.id!, updatedTask).subscribe(() => {
          Object.assign(task, updatedTask);
        });
      }
    });
  }

  deleteTask(task: TaskModel, tipo: number) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: { task: { ...task }, tipo }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.confirmDelete) {
        this.dashBoardService.deleteTask(task.id!).subscribe(() => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        });
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}