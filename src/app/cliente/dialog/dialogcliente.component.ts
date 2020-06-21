import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiclienteService } from 'src/app/services/apicliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clientes } from 'src/app/models/clientes';

@Component({
    templateUrl: 'dialogcliente.component.html'
})
export class DialogClienteComponent
{
    public nombre: string;

    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        public apiCliente: ApiclienteService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public cliente: Clientes
        )
        {
            if(cliente != null)
            {
                this.nombre = cliente.nombre;
            }
        }

    close()
    {
        this.dialogRef.close();
    }

    addCliente()
    {
        const cliente: Clientes = { nombre: this.nombre, idCliente: "" };
        this.apiCliente.addCliente(cliente).subscribe(response =>
            {
                if(response.successful === 1)
                {
                    this.dialogRef.close();
                    this.snackBar.open('Cliente insertado con éxito', '', { duration: 2000 });
                }
            });
    }

    editCliente()
    {
        const cliente: Clientes = { nombre: this.nombre, idCliente: this.cliente.idCliente };
        this.apiCliente.editCliente(cliente).subscribe(response =>
            {
                if(response.successful === 1)
                {
                    this.dialogRef.close();
                    this.snackBar.open('Cliente editado con éxito', '', { duration: 2000 });
                }
            });
    }
}