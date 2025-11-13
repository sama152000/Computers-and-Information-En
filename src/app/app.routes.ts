import { Routes } from '@angular/router';
import { HomeComponent } from './core/features/Computers-and-Information/Pages/Home/Home.component';
import { ComputersAndInformationComponent } from './core/features/Computers-and-Information/Computers-and-Information.component';

export const routes: Routes = [

{
    path: '',
    component: ComputersAndInformationComponent,
    children: [
      { path: 'home', component: HomeComponent },

 { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }


];
