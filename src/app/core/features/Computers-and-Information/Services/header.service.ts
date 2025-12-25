import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeaderData, NavigationItem } from '../model/header.model';
import { DepartmentsService } from './departments.service';
import { UnitsService } from './units.service';
import { ServicesService } from './services.service';
import { SectorsService } from './sectors.service';
import { ProgramsService } from './programs.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(
    private departmentsService: DepartmentsService,
    private unitsService: UnitsService,
    private servicesService: ServicesService,
    private sectorsService: SectorsService,
    private programsService: ProgramsService
  ) {}
  private headerData: HeaderData = {
    logo: {
      url: './assets/logo.jpg',
      alt: 'Faculty of Computers and Information',
      route: '/',
    },
    navigation: [
      {
        id: 1,
        label: 'Home',
        route: 'home',
      },
      {
        id: 2,
        label: 'About',
        route: 'about',
        children: [
          {
            id: 20,
            label: 'Vision & Mission',
            route: 'about',
            fragment: 'vision-mission',
            queryParams: { tab: 'vision-mission' },
            icon: 'pi pi-eye',
          },
          {
            id: 21,
            label: "Dean's Message",
            route: 'about',
            fragment: 'dean-message',
            queryParams: { tab: 'dean-message' },
            icon: 'pi pi-user',
          },
          {
            id: 22,
            label: 'Objectives',
            route: 'about',
            fragment: 'objectives',
            queryParams: { tab: 'objectives' },
            icon: 'pi pi-check-circle',
          },
          {
            id: 23,
            label: 'Our History',
            route: 'about',
            fragment: 'history',
            queryParams: { tab: 'history' },
            icon: 'pi pi-clock',
          },
          {
            id: 24,
            label: 'About Faculty',
            route: 'about',
            fragment: 'content',
            queryParams: { tab: 'content' },
            icon: 'pi pi-info-circle',
          },
          {
            id: 25,
            label: 'Administrative Structure',
            route: 'about',
            fragment: 'admin-structure',
            queryParams: { tab: 'admin-structure' },
            icon: 'pi pi-users',
          },
        ],
      },
      {
        id: 3,
        label: 'Programs',
        route: 'programs',
      },
      {
        id: 4,
        label: 'Sectors',
        route: 'sectors',
      },
      {
        id: 5,
        label: 'Services',
        route: 'services',
      },
      {
        id: 6,
        label: 'News',
        route: 'news',
      },
      {
        id: 7,
        label: 'Units',
        route: 'units',
      },
      {
        id: 8,
        label: 'Department',
        route: 'departments',
      },
      {
        id: 9,
        label: 'Contact',
        route: 'contact-us',
      },
    ],
    languages: [
      {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
      },
      {
        code: 'ar',
        name: 'العربية',
        flag: '🇪🇬',
      },
    ],
    searchEnabled: true,
  };

  getHeaderData(): Observable<HeaderData> {
    return of(this.headerData);
  }

  getNavigationItems(): Observable<NavigationItem[]> {
    return forkJoin([
      of(this.headerData.navigation),
      this.departmentsService.getAllDepartments(),
      this.unitsService.getAllUnits(),
      this.servicesService.getAllServices(),
      this.sectorsService.getAllSectors(),
      this.programsService.getAllPrograms(),
    ]).pipe(
      map(([navigation, departments, units, services, sectors, programs]) => {
        const departmentItem = navigation.find(
          (item) => item.label === 'Department'
        );
        if (departmentItem) {
          departmentItem.children = departments.map((dept, index) => ({
            id: 100 + index, // Start from 100 to avoid conflicts with existing ids
            label: dept.name,
            route: `departments/${dept.id}`,
            icon: 'pi pi-users',
          }));
        }
        const unitsItem = navigation.find((item) => item.label === 'Units');
        if (unitsItem) {
          unitsItem.children = units.map((unit, index) => ({
            id: 200 + index, // Start from 200 to avoid conflicts with existing ids
            label: unit.name,
            route: `units/${unit.id}`,
            icon: 'pi pi-cog',
          }));
        }
        const servicesItem = navigation.find(
          (item) => item.label === 'Services'
        );
        if (servicesItem) {
          servicesItem.children = services.map((service, index) => ({
            id: 300 + index, // Start from 300 to avoid conflicts with existing ids
            label: service.name,
            route: `services/${service.id}`,
            icon: 'pi pi-wrench',
          }));
        }
        const sectorsItem = navigation.find((item) => item.label === 'Sectors');
        if (sectorsItem) {
          sectorsItem.children = sectors.map((sector, index) => ({
            id: 400 + index, // Start from 400 to avoid conflicts with existing ids
            label: sector.name,
            route: `sectors/${sector.id}`,
            icon: 'pi pi-building',
          }));
        }
        const programsItem = navigation.find(
          (item) => item.label === 'Programs'
        );
        if (programsItem) {
          programsItem.children = programs.map((program, index) => ({
            id: 500 + index, // Start from 500 to avoid conflicts with existing ids
            label: program.name,
            route: `programs/${program.id}`,
            icon: 'pi pi-graduation-cap',
          }));
        }
        return navigation;
      })
    );
  }

  getLogo(): Observable<HeaderData['logo']> {
    return of(this.headerData.logo);
  }

  getLanguages(): Observable<HeaderData['languages']> {
    return of(this.headerData.languages);
  }

  isSearchEnabled(): Observable<boolean> {
    return of(this.headerData.searchEnabled);
  }
}
