import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

const modules = [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatIconModule, MatSelectModule]

@NgModule({
    imports: [...modules],
    exports: [...modules]
})
export class MaterialModules { }