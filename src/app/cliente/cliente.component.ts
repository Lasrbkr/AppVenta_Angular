import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';
import { Clientes } from '../models/clientes';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public list : any[];
  public columnas : string[] = ['idCliente', 'nombre', 'actions'];
  readonly width: string = "300px";

  constructor(
    private apiCliente: ApiclienteService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar)
  {
    
  }

  ngOnInit(): void 
  {
    this.getClientes();
  }

  getClientes()
  {
    this.apiCliente.getCliente().subscribe(response => 
      {
        this.list = response.data;
      });
  }

  openAdd()
  {
    const dialogRef = this.dialog.open(DialogClienteComponent,
      {
        width: this.width
      });
      dialogRef.afterClosed().subscribe(result=>
        {
          this.getClientes();
        });
  }

  openEdit(cliente: Clientes)
  {
    const dialogRef = this.dialog.open(DialogClienteComponent,
      {
        width: this.width,
        data: cliente
      });
      dialogRef.afterClosed().subscribe(result=>
        {
          this.getClientes();
        });
  }

  openDelete(cliente: Clientes)//LLama al dialog para confirmar la eliminación del objeto
  {
    const dialogRef = this.dialog.open(DialogDeleteComponent,
      {
        width: this.width
      });
      dialogRef.afterClosed().subscribe(result=>
        {
          if(result)
          {
            this.apiCliente.deleteCliente(cliente.idCliente).subscribe(response => {
              if(response.successful == 1)
              {
                this.snackBar.open('Cliente eliminado con éxito', '', { duration: 2000 });
                this.getClientes();
              }
              else
              {
                console.log(response.message);
              }
            });
          }
        });
  }
}
