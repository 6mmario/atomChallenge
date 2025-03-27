import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GenericResponse } from '../../models/authResponse';
import { EmailModel } from '../../models/EmailModel';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalMensajeComponent } from '../modal-mensaje/modal-mensaje.component';
import { UserService } from '../../service/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';

  constructor(private loginService: LoginService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  onLogin() {
    if (!this.email || this.email.trim() === '') {
      this.dialog.open(ModalMensajeComponent, {
        data: { mensaje: 'Se requiere un correo electrónico' }
      });
      return;
    }

    this.spinner.show();
    this.loginService.login(this.email).subscribe({
      next: (response) => {
        console.log('Respuesta del login:', response);
        const data: GenericResponse<EmailModel> = response;
        this.spinner.hide();

        console.log(data)
      },
      error: (error) => {
        console.error('Error al hacer login:', error);
        this.spinner.hide();


        //TODO: valido el tipo de error para registrar el correo
        const mensaje = error.status === 404
          ? 'Correo no existe, desea registrarlo?'
          : 'Error en el servidor, por favor intente más tarde.';

        const dialogRef = this.dialog.open(ModalMensajeComponent, {
          data: { mensaje, email: this.email }
        });

        dialogRef.afterClosed().subscribe((resultado: string | undefined) => {
          if (resultado) {
            console.log('Correo ingresado para registro:', resultado);

            this.userService.register(resultado).subscribe({
              next: (res) => {
                console.log('Registro exitoso:', res);

                this.snackBar.open('Correo creado exitosamente', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top'
                });
              
            },
              error: (err) => {
                console.error('Error al registrar correo:', err);
                const mensaje = err.status === 400
                  ? 'Se requiere un correo electrónico'
                  : err.status === 409
                    ? 'El correo ya está registrado'
                    : 'Error inesperado al registrar';

                this.dialog.open(ModalMensajeComponent, {
                  data: { mensaje }
                });
              }
            });
      }
    });
  }
});
  }


}
