# Departments Services

This folder contains all services related to departments management.

## Services

### 1. DepartmentsService

Main service for department entities.

- `getAll()`: Get all departments
- `getPaged(data)`: Get paginated departments
- `getById(id)`: Get department by ID

### 2. DepartmentDetailsService

Service for department details (vision, mission, goals, etc.).

- `getAll()`: Get all department details
- `getPaged(data)`: Get paginated department details
- `getById(id)`: Get department detail by ID

### 3. DepartmentMembersService

Service for department members (faculty, staff).

- `getAll()`: Get all department members
- `getPaged(data)`: Get paginated department members
- `getById(id)`: Get department member by ID

### 4. DepartmentProgramsService

Service for department academic programs.

- `getAll()`: Get all department programs
- `getPaged(data)`: Get paginated department programs
- `getById(id)`: Get department program by ID

### 5. DepartmentServicesService

Service for services provided by departments.

- `getAll()`: Get all department services
- `getPaged(data)`: Get paginated department services
- `getById(id)`: Get department service by ID

## Usage

```typescript
import { DepartmentsService, DepartmentDetailsService, DepartmentMembersService, DepartmentProgramsService, DepartmentServicesService } from "./Services/real-services/departments";

// Or use barrel export
import * as DepartmentServices from "./Services/real-services/departments";
```

## API Endpoints

All endpoints are defined in `api-endpoints.ts`:

- DEPARTMENTS
- DEPARTMENTDETAILS
- DEPARTMENTMEMBERS
- DEPARTMENTPROGRAMS
- DEPARTMENTSERVICES
