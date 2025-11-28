import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { HeaderService } from '../../../Services/header.service';
import { HeaderData, NavigationItem } from '../../../model/header.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNavbarCollapsed = true;
  headerData!: HeaderData;
  navigationItems: NavigationItem[] = [];

  constructor(private headerService: HeaderService, private router: Router) {}

  ngOnInit() {
    this.headerService.getHeaderData().subscribe(data => {
      this.headerData = data;
    });
    this.headerService.getNavigationItems().subscribe(items => {
      this.navigationItems = items;
      // Initialize isOpen property for items with children
      this.navigationItems.forEach(item => {
        if (item.children && item.children.length > 0) {
          item['isOpen'] = false;
        }
      });
    });

    // Close dropdowns on navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeAllDropdowns();
      }
    });
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  toggleDropdown(item: NavigationItem, event: Event) {
    // Prevent default link behavior
    event.preventDefault();
    event.stopPropagation();
    // Toggle dropdown visibility
    item['isOpen'] = !item['isOpen'];
  }

  closeDropdown(item: NavigationItem) {
    // Close dropdown after navigation
    item['isOpen'] = false;
    // Also close navbar on mobile
    this.isNavbarCollapsed = true;
  }

  closeAllDropdowns() {
    this.navigationItems.forEach(item => {
      if (item.children && item.children.length > 0) {
        item['isOpen'] = false;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.closeAllDropdowns();
    // Close navbar on mobile when clicking outside
    if (window.innerWidth < 768) {
      this.isNavbarCollapsed = true;
    }
  }
}
