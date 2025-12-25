import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './core/features/Computers-and-Information/Computers-and-Information.component'
      ).then((m) => m.ComputersAndInformationComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/Home/Home.component'
          ).then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/about/about.component'
          ).then((m) => m.AboutComponent),
        children: [
          {
            path: 'dean-message',
            loadComponent: () =>
              import(
                './core/features/Computers-and-Information/Pages/about/dean-message/dean-message.component'
              ).then((m) => m.DeanMessageComponent),
          },
          {
            path: 'vision-mission',
            loadComponent: () =>
              import(
                './core/features/Computers-and-Information/Pages/about/vision-mission-page/vision-mission-page.component'
              ).then((m) => m.VisionMissionpageComponent),
          },
          {
            path: 'objectives',
            loadComponent: () =>
              import(
                './core/features/Computers-and-Information/Pages/about/objectives/objectives.component'
              ).then((m) => m.ObjectivesComponent),
          },
          {
            path: 'history',
            loadComponent: () =>
              import(
                './core/features/Computers-and-Information/Pages/about/history/history.component'
              ).then((m) => m.HistoryComponent),
          },
          {
            path: 'content',
            loadComponent: () =>
              import(
                './core/features/Computers-and-Information/Pages/about/content/content.component'
              ).then((m) => m.ContentComponent),
          },
          {
            path: 'admin-structure',
            loadComponent: () =>
              import(
                './core/features/Computers-and-Information/Pages/about/admin-structure/admin-structure.component'
              ).then((m) => m.AdminStructureComponent),
          },
          { path: '', redirectTo: 'dean-message', pathMatch: 'full' },
        ],
      },
      {
        path: 'news',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/news/news.component'
          ).then((m) => m.NewsComponent),
      },
      // Explicit filtered list routes so tab navigation (e.g. /news/events) works
      {
        path: 'news/events',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/news/news.component'
          ).then((m) => m.NewsComponent),
      },
      {
        path: 'news/news',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/news/news.component'
          ).then((m) => m.NewsComponent),
      },
      // Support detail route with type and id (e.g. /news/news/123 or /news/event/123)
      {
        path: 'news/:type/:id',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/news/news-details/news-details.component'
          ).then((m) => m.NewsDetailsComponent),
      },
      // Legacy single-segment id route (optional)
      {
        path: 'news/:id',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/news/news-details/news-details.component'
          ).then((m) => m.NewsDetailsComponent),
      },
      {
        path: 'departments',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/departments/departments.component'
          ).then((m) => m.DepartmentsComponent),
      },
      {
        path: 'departments/:id',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/departments/departments.component'
          ).then((m) => m.DepartmentsComponent),
      },
      {
        path: 'departments/:id/:section',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/departments/departments.component'
          ).then((m) => m.DepartmentsComponent),
      },
      {
        path: 'units',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/units/units.component'
          ).then((m) => m.UnitsComponent),
      },
      {
        path: 'units/:id',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/units/units.component'
          ).then((m) => m.UnitsComponent),
      },
      {
        path: 'units/:id/:section',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/units/units.component'
          ).then((m) => m.UnitsComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/services/services.component'
          ).then((m) => m.ServicesComponent),
      },
      {
        path: 'services/:id',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/services/services.component'
          ).then((m) => m.ServicesComponent),
      },
      {
        path: 'services/:id/:section',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/services/services.component'
          ).then((m) => m.ServicesComponent),
      },
      {
        path: 'sectors',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/sectors/sectors.component'
          ).then((m) => m.SectorsComponent),
      },
      {
        path: 'sectors/:id',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/sectors/sectors.component'
          ).then((m) => m.SectorsComponent),
      },
      {
        path: 'sectors/:id/:section',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/sectors/sectors.component'
          ).then((m) => m.SectorsComponent),
      },
      {
        path: 'programs',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/programs/programs.component'
          ).then((m) => m.ProgramsComponent),
      },
      {
        path: 'programs/:id',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/programs/programs.component'
          ).then((m) => m.ProgramsComponent),
      },
      {
        path: 'programs/:id/:section',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/programs/programs.component'
          ).then((m) => m.ProgramsComponent),
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import(
            './core/features/Computers-and-Information/Pages/contact-us/contact-us.component'
          ).then((m) => m.ContactUsComponent),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
