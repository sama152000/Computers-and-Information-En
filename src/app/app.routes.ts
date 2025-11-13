import { Routes } from '@angular/router';
import { HomeComponent } from './core/features/Computers-and-Information/Pages/Home/Home.component';
import { ComputersAndInformationComponent } from './core/features/Computers-and-Information/Computers-and-Information.component';
import { AboutComponent } from './core/features/Computers-and-Information/Pages/about/about.component';
import { NewsComponent } from './core/features/Computers-and-Information/Pages/news/news.component';
import { NewsDetailsComponent } from './core/features/Computers-and-Information/Pages/news/news-details/news-details.component';

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

 { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }


];
