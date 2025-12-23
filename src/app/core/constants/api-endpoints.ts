/**
 * API Endpoints Constants
 * Centralized API endpoint definitions
 */
export const API_ENDPOINTS = {
  // Centers
  CENTERS: {
    BASE: '/center',
    GET_ALL: '/center/getall',
    GET_PAGED: '/center/getpaged',
    GET_BY_ID: (id: string) => `/center/get/${id}`,
  },

  CONTACTS: {
    BASE: '/contacts',
    GET_ALL: '/contacts/getall',
    GET_PAGED: '/contacts/getpaged',
    GET_BY_ID: (id: string) => `/contacts/get/${id}`,
  },
  // Pages / About
  PAGES: {
    BASE: '/about',
    GET_ALL: '/about/getall',
    GET_PAGED: '/about/getpaged',
    GET_BY_ID: (id: string) => `/about/get/${id}`,
  },
  FACULTIES: {
    BASE: '/faculty/',
    GET_ALL: '/faculty/getall',
    GET_PAGED: '/faculty/getpaged',
    GET_BY_ID: (id: string) => `/faculty/get/${id}`,
  },

  // Managements
  MANAGMENTS: {
    BASE: '/management',
    GET_ALL: '/management/getall',
    GET_PAGED: '/management/getpaged',
    GET_BY_ID: (id: string) => `/management/get/${id}`,
  },

  // Management Details
  MANAGEMENTDETAIL: {
    BASE: '/managementdetail',
    GET_ALL: '/managementdetail/getall',
    GET_PAGED: '/managementdetail/getpaged',
    GET_BY_ID: (id: string) => `/managementdetail/get/${id}`,
  },

  // Management Members
  MANAGEMENTMEMBER: {
    BASE: '/managementmember',
    GET_ALL: '/managementmember/getall',
    GET_PAGED: '/managementmember/getpaged',
    GET_BY_ID: (id: string) => `/managementmember/get/${id}`,
  },

  // News
  NEWS: {
    BASE: '/posts',
    GET_ALL: '/posts/getall',
    GET_PAGED: '/posts/getpaged',
    GET_BY_ID: (id: string) => `/posts/get/${id}`,
  },

  // Categories
  CATEGORIES: {
    BASE: '/categories',
    GET_ALL: '/categories/getall',
  },

  // Events
  EVENTS: {
    BASE: '/events',
    GET_ALL: '/events/getall',
    GET_PAGED: '/events/getpaged',
    GET_BY_ID: (id: string) => `/events/get/${id}`,
  },

  // Sectors
  SECTORS: {
    BASE: '/sectors',
    GET_ALL: '/sectors/getall',
    GET_PAGED: '/sectors/getpaged',
    GET_BY_ID: (id: string) => `/sectors/get/${id}`,
  },

  // Logos
  LOGOS: {
    BASE: '/logos',
    GET_ALL: '/logos/getall',
    GET_PAGED: '/logos/getpaged',
    GET_BY_ID: (id: string) => `/logos/get/${id}`,
  },

  // Statistics
  STATISTICS: {
    BASE: '/statistics',
    GET_ALL: '/statistics/getall',
    GET_PAGED: '/statistics/getpaged',
    GET_BY_ID: (id: string) => `/statistic/get/${id}`,
  },

  // Hero Sections
  HERO_SECTIONS: {
    BASE: '/herosections',
    GET_ALL: '/herosections/getall',
    GET_PAGED: '/herosections/getpaged',
    GET_BY_ID: (id: string) => `/herosections/get/${id}`,
  },

  // Dean Speeches
  DEANSPEECHS: {
    BASE: '/deanspeechs',
    GET_ALL: '/deanspeechs/getall',
    GET_PAGED: '/deanspeechs/getpaged',
    GET_BY_ID: (id: string) => `/deanspeechs/get/${id}`,
  },

  // Structures
  STRUCTURES: {
    BASE: '/structures',
    GET_ALL: '/structures/getall',
    GET_PAGED: '/structures/getpaged',
    GET_BY_ID: (id: string) => `/structures/get/${id}`,
  },

  // Student Lifes
  STUDENTLIFES: {
    BASE: '/studentlifes',
    GET_ALL: '/studentlifes/getall',
    GET_PAGED: '/studentlifes/getpaged',
    GET_BY_ID: (id: string) => `/studentlifes/get/${id}`,
  },

  // Programs
  PROGRAM: {
    BASE: '/program',
    GET_ALL: '/program/getall',
    GET_PAGED: '/program/getpaged',
    GET_BY_ID: (id: string) => `/program/get/${id}`,
  },

  // Program Details
  PROGRAMDETAIL: {
    BASE: '/programdetail',
    GET_ALL: '/programdetail/getall',
    GET_PAGED: '/programdetail/getpaged',
    GET_BY_ID: (id: string) => `/programdetail/get/${id}`,
  },

  // Program Members
  PROGRAMMEMBER: {
    BASE: '/programmember',
    GET_ALL: '/programmember/getall',
    GET_PAGED: '/programmember/getpaged',
    GET_BY_ID: (id: string) => `/programmember/get/${id}`,
  },

  // Sector Details
  SECTORDETAILS: {
    BASE: '/sectordetails',
    GET_ALL: '/sectordetails/getall',
    GET_PAGED: '/sectordetails/getpaged',
    GET_BY_ID: (id: string) => `/sectordetails/get/${id}`,
  },

  // Sector Members
  SECTORMEMBER: {
    BASE: '/sectormember',
    GET_ALL: '/sectormember/getall',
    GET_PAGED: '/sectormember/getpaged',
    GET_BY_ID: (id: string) => `/sectormember/get/${id}`,
  },

  // Sector Posts
  SECTORPOST: {
    BASE: '/sectorposts',
    GET_ALL: '/sectorposts/getall',
    GET_PAGED: '/sectorposts/getpaged',
    GET_BY_ID: (id: string) => `/sectorposts/get/${id}`,
  },

  // Sector Programs
  SECTORPROGRAMS: {
    BASE: '/sectorprograms',
    GET_ALL: '/sectorprograms/getall',
    GET_PAGED: '/sectorprograms/getpaged',
    GET_BY_ID: (id: string) => `/sectorprograms/get/${id}`,
  },

  // Sector Services
  SECTORSERVICES: {
    BASE: '/sectorservices',
    GET_ALL: '/sectorservices/getall',
    GET_PAGED: '/sectorservices/getpaged',
    GET_BY_ID: (id: string) => `/sectorservices/get/${id}`,
  },

  // Sector Units
  SECTORUNITS: {
    BASE: '/sectorunits',
    GET_ALL: '/sectorunits/getall',
    GET_PAGED: '/sectorunits/getpaged',
    GET_BY_ID: (id: string) => `/sectorunits/get/${id}`,
  },

  // Departments
  DEPARTMENTS: {
    BASE: '/departments',
    GET_ALL: '/departments/getall',
    GET_PAGED: '/departments/getpaged',
    GET_BY_ID: (id: string) => `/departments/get/${id}`,
  },

  // Department Details
  DEPARTMENTDETAILS: {
    BASE: '/departmentdetails',
    GET_ALL: '/departmentdetails/getall',
    GET_PAGED: '/departmentdetails/getpaged',
    GET_BY_ID: (id: string) => `/departmentdetails/get/${id}`,
  },

  // Department Members
  DEPARTMENTMEMBERS: {
    BASE: '/departmentmembers',
    GET_ALL: '/departmentmembers/getall',
    GET_PAGED: '/departmentmembers/getpaged',
    GET_BY_ID: (id: string) => `/departmentmembers/get/${id}`,
  },

  // Department Programs
  DEPARTMENTPROGRAMS: {
    BASE: '/departmentprograms',
    GET_ALL: '/departmentprograms/getall',
    GET_PAGED: '/departmentprograms/getpaged',
    GET_BY_ID: (id: string) => `/departmentprograms/get/${id}`,
  },

  // Department Services
  DEPARTMENTSERVICES: {
    BASE: '/departmentservices',
    GET_ALL: '/departmentservices/getall',
    GET_PAGED: '/departmentservices/getpaged',
    GET_BY_ID: (id: string) => `/departmentservices/get/${id}`,
  },

  // Members
  MEMBERS: {
    BASE: '/member',
    GET_ALL: '/member/getall',
    GET_PAGED: '/member/getpaged',
    GET_BY_ID: (id: string) => `/member/get/${id}`,
  },

  // Services
  SERVICES: {
    BASE: '/services',
    GET_ALL: '/services/getall',
    GET_PAGED: '/services/getpaged',
    GET_BY_ID: (id: string) => `/services/get/${id}`,
  },

  // Center Details
  CENTERDETAIL: {
    BASE: '/centerdetail',
    GET_ALL: '/centerdetail/getall',
    GET_PAGED: '/centerdetail/getpaged',
    GET_BY_ID: (id: string) => `/centerdetail/get/${id}`,
  },

  // Center Members
  CENTERMEMBER: {
    BASE: '/centermember',
    GET_ALL: '/centermember/getall',
    GET_PAGED: '/centermember/getpaged',
    GET_BY_ID: (id: string) => `/centermember/get/${id}`,
  },

  // Units
  UNITS: {
    BASE: '/unit',
    GET_ALL: '/unit/getall',
    GET_PAGED: '/unit/getpaged',
    GET_BY_ID: (id: string) => `/unit/get/${id}`,
  },

  // Unit Details
  UNITDETAIL: {
    BASE: '/unitdetail',
    GET_ALL: '/unitdetail/getall',
    GET_PAGED: '/unitdetail/getpaged',
    GET_BY_ID: (id: string) => `/unitdetail/get/${id}`,
  },

  // Unit Members
  UNITMEMBER: {
    BASE: '/unitmember',
    GET_ALL: '/unitmember/getall',
    GET_PAGED: '/unitmember/getpaged',
    GET_BY_ID: (id: string) => `/unitmember/get/${id}`,
  },
} as const;
