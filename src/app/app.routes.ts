import { Routes } from '@angular/router';
import { HomeComponent } from './core/features/Computers-and-Information/Pages/Home/Home.component';
import { ComputersAndInformationComponent } from './core/features/Computers-and-Information/Computers-and-Information.component';
import { AboutComponent } from './core/features/Computers-and-Information/Pages/about/about.component';
import { NewsComponent } from './core/features/Computers-and-Information/Pages/news/news.component';
import { NewsDetailsComponent } from './core/features/Computers-and-Information/Pages/news/news-details/news-details.component';
import { DepartmentsComponent } from './core/features/Computers-and-Information/Pages/departments/departments.component';
import { UnitsComponent } from './core/features/Computers-and-Information/Pages/units/units.component';
import { ServicesComponent } from './core/features/Computers-and-Information/Pages/services/services.component';
import { SectorsComponent } from './core/features/Computers-and-Information/Pages/sectors/sectors.component';
import { ProgramsComponent } from './core/features/Computers-and-Information/Pages/programs/programs.component';
import { ContactUsComponent } from './core/features/Computers-and-Information/Pages/contact-us/contact-us.component';
export const routes: Routes = [

{
    path: '',
    component: ComputersAndInformationComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  // Explicit filtered list routes so tab navigation (e.g. /news/events) works
  { path: 'news/events', component: NewsComponent },
  { path: 'news/news', component: NewsComponent },
  // Support detail route with type and id (e.g. /news/news/123 or /news/event/123)
  { path: 'news/:type/:id', component: NewsDetailsComponent },
  // Legacy single-segment id route (optional)
  { path: 'news/:id', component: NewsDetailsComponent },

    { path: 'departments', component: DepartmentsComponent },
  { path: 'departments/:id', component: DepartmentsComponent },
  { path: 'departments/:id/:section', component: DepartmentsComponent },

  { path: 'units', component: UnitsComponent },
{ path: 'units/:id', component: UnitsComponent },
{ path: 'units/:id/:section', component: UnitsComponent },

{ path: 'services', component: ServicesComponent },
{ path: 'services/:id', component: ServicesComponent },
{ path: 'services/:id/:section', component: ServicesComponent },

{ path: 'sectors', component: SectorsComponent },
{ path: 'sectors/:id', component: SectorsComponent },
{ path: 'sectors/:id/:section', component: SectorsComponent },

{ path: 'programs', component: ProgramsComponent },
{ path: 'programs/:id', component: ProgramsComponent },
{ path: 'programs/:id/:section', component: ProgramsComponent },

{ path: 'contact-us', component: ContactUsComponent },

 { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }


];
