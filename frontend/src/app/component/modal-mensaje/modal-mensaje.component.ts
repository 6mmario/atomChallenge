import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-mensaje',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './modal-mensaje.component.html',
  styleUrl: './modal-mensaje.component.scss'
})
export class ModalMensajeComponent {
  mensaje: string;
  email: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string, email: string }) {
    this.mensaje = data.mensaje;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
