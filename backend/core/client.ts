/** Generate by swagger-axios-codegen */
// tslint:disable
/* eslint-disable */
import axiosStatic, { AxiosInstance } from 'axios';

export interface IRequestOptions {
  headers?: any;
  baseURL?: string;
  responseType?: string;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AuthService {
  /**
   * Login
   */
  login(
    params: {
      /** requestBody */
      body?: LoginDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LoginResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/login';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Token
   */
  token(options: IRequestOptions = {}): Promise<LoginResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/token';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ListingsService {
  /**
   * List listings
   */
  list(
    params: {
      /**  */
      jsonpath?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ListingExtendedDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listings';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { jsonpath: params['jsonpath'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Create listing
   */
  create(
    params: {
      /** requestBody */
      body?: ListingCreateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ListingDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listings';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Get listing by id
   */
  retrieve(
    params: {
      /**  */
      listingId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ListingDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listings/{listingId}';
      url = url.replace('{listingId}', params['listingId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Update listing by id
   */
  update(
    params: {
      /**  */
      listingId: string;
      /** requestBody */
      body?: ListingUpdateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ListingDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listings/{listingId}';
      url = url.replace('{listingId}', params['listingId'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete listing by id
   */
  delete(
    params: {
      /**  */
      listingId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listings/{listingId}';
      url = url.replace('{listingId}', params['listingId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ApplicationsService {
  /**
   * List applications
   */
  list(
    params: {
      /**  */
      listingId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applications';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { listingId: params['listingId'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Create application
   */
  create(
    params: {
      /** requestBody */
      body?: ApplicationCreateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applications';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * List applications as csv
   */
  listAsCsv(
    params: {
      /**  */
      listingId: string;
      /**  */
      includeHeaders: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applications/csv';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { listingId: params['listingId'], includeHeaders: params['includeHeaders'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Get application by id
   */
  retrieve(
    params: {
      /**  */
      applicationId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applications/{applicationId}';
      url = url.replace('{applicationId}', params['applicationId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Update application by id
   */
  update(
    params: {
      /**  */
      applicationId: string;
      /** requestBody */
      body?: ApplicationUpdateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applications/{applicationId}';
      url = url.replace('{applicationId}', params['applicationId'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete application by id
   */
  delete(
    params: {
      /**  */
      applicationId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applications/{applicationId}';
      url = url.replace('{applicationId}', params['applicationId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class AssetsService {
  /**
   * List assets
   */
  list(options: IRequestOptions = {}): Promise<AssetDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/assets';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Create asset
   */
  create(
    params: {
      /** requestBody */
      body?: AssetCreateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AssetDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/assets';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Update asset
   */
  update(
    params: {
      /** requestBody */
      body?: AssetUpdateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AssetDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/assets/{assetId}';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Get asset by id
   */
  retrieve(
    params: {
      /**  */
      assetId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AssetDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/assets/{assetId}';
      url = url.replace('{assetId}', params['assetId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete asset by id
   */
  delete(
    params: {
      /**  */
      assetId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/assets/{assetId}';
      url = url.replace('{assetId}', params['assetId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class PreferencesService {
  /**
   * List preferences
   */
  list(options: IRequestOptions = {}): Promise<PreferenceDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/preferences';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Create preference
   */
  create(
    params: {
      /** requestBody */
      body?: PreferenceCreateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PreferenceDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/preferences';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Update preference
   */
  update(
    params: {
      /** requestBody */
      body?: PreferenceUpdateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PreferenceDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/preferences/{preferenceId}';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Get preference by id
   */
  retrieve(
    params: {
      /**  */
      preferenceId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PreferenceDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/preferences/{preferenceId}';
      url = url.replace('{preferenceId}', params['preferenceId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete preference by id
   */
  delete(
    params: {
      /**  */
      preferenceId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/preferences/{preferenceId}';
      url = url.replace('{preferenceId}', params['preferenceId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ApplicationMethodsService {
  /**
   * List applicationMethods
   */
  list(options: IRequestOptions = {}): Promise<ApplicationMethodDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applicationMethods';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Create applicationMethod
   */
  create(
    params: {
      /** requestBody */
      body?: ApplicationMethodCreateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationMethodDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applicationMethods';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Update applicationMethod
   */
  update(
    params: {
      /** requestBody */
      body?: ApplicationMethodUpdateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationMethodDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applicationMethods/{applicationMethodId}';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Get applicationMethod by id
   */
  retrieve(
    params: {
      /**  */
      applicationMethodId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationMethodDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applicationMethods/{applicationMethodId}';
      url = url.replace('{applicationMethodId}', params['applicationMethodId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete applicationMethod by id
   */
  delete(
    params: {
      /**  */
      applicationMethodId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/applicationMethods/{applicationMethodId}';
      url = url.replace('{applicationMethodId}', params['applicationMethodId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class UnitsService {
  /**
   * List units
   */
  list(options: IRequestOptions = {}): Promise<UnitDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/units';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Create unit
   */
  create(
    params: {
      /** requestBody */
      body?: UnitCreateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UnitDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/units';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Update unit
   */
  update(
    params: {
      /** requestBody */
      body?: UnitUpdateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UnitDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/units/{unitId}';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Get unit by id
   */
  retrieve(
    params: {
      /**  */
      unitId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UnitDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/units/{unitId}';
      url = url.replace('{unitId}', params['unitId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete unit by id
   */
  delete(
    params: {
      /**  */
      unitId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/units/{unitId}';
      url = url.replace('{unitId}', params['unitId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ListingEventsService {
  /**
   * List listingEvents
   */
  list(options: IRequestOptions = {}): Promise<ListingEventDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listingEvents';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Create listingEvent
   */
  create(
    params: {
      /** requestBody */
      body?: ListingEventCreateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ListingEventDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listingEvents';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Update listingEvent
   */
  update(
    params: {
      /** requestBody */
      body?: ListingEventUpdateDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ListingEventDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listingEvents/{listingEventId}';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Get listingEvent by id
   */
  retrieve(
    params: {
      /**  */
      listingEventId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ListingEventDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listingEvents/{listingEventId}';
      url = url.replace('{listingEventId}', params['listingEventId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete listingEvent by id
   */
  delete(
    params: {
      /**  */
      listingEventId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/listingEvents/{listingEventId}';
      url = url.replace('{listingEventId}', params['listingEventId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export interface UserDto {
  /**  */
  id: string;

  /**  */
  email: string;

  /**  */
  firstName: string;

  /**  */
  middleName?: string;

  /**  */
  lastName: string;

  /**  */
  dob: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;
}

export interface UserCreateDto {
  /**  */
  password: string;

  /**  */
  email: string;

  /**  */
  firstName: string;

  /**  */
  middleName?: string;

  /**  */
  lastName: string;

  /**  */
  dob: string;
}

export interface UserDtoWithAccessToken {
  /**  */
  id: string;

  /**  */
  email: string;

  /**  */
  firstName: string;

  /**  */
  middleName?: string;

  /**  */
  lastName: string;

  /**  */
  dob: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  accessToken: string;
}

export interface UserUpdateDto {
  /**  */
  id: string;

  /**  */
  firstName: string;

  /**  */
  middleName?: string;

  /**  */
  lastName: string;

  /**  */
  dob: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;
}

export interface LoginDto {
  /**  */
  email: string;

  /**  */
  password: string;
}

export interface LoginResponseDto {
  /**  */
  accessToken: string;
}

export interface MinMax {
  /**  */
  min: number;

  /**  */
  max: number;

  /**  */
  type: object;
}

export interface UnitSummary {
  /**  */
  unitType: string;

  /**  */
  minIncomeRange: object;

  /**  */
  occupancyRange: MinMax;

  /**  */
  rentAsPercentIncomeRange: MinMax;

  /**  */
  rentRange: object;

  /**  */
  totalAvailable: number;

  /**  */
  areaRange: MinMax;

  /**  */
  floorRange?: MinMax;
}

export interface UnitSummaryByReservedType {
  /**  */
  reservedType: string;

  /**  */
  byUnitType: UnitSummary[];
}

export interface UnitSummaryByAMI {
  /**  */
  percent: string;

  /**  */
  byNonReservedUnitType: UnitSummary[];

  /**  */
  byReservedType: UnitSummaryByReservedType[];
}

export interface HMI {
  /**  */
  columns: object;

  /**  */
  rows: object[];
}

export interface UnitsSummarized {
  /**  */
  unitTypes: string[];

  /**  */
  reservedTypes: string[];

  /**  */
  priorityTypes: string[];

  /**  */
  amiPercentages: string[];

  /**  */
  byUnitType: UnitSummary[];

  /**  */
  byNonReservedUnitType: UnitSummary[];

  /**  */
  byReservedType: UnitSummaryByReservedType[];

  /**  */
  byAMI: UnitSummaryByAMI[];

  /**  */
  hmi: HMI;
}

export interface ApplicationMethodDto {
  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  type: EnumApplicationMethodDtoType;

  /**  */
  label: string;

  /**  */
  externalReference: string;

  /**  */
  acceptsPostmarkedApplications: boolean;
}

export interface AssetDto {
  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  label: string;

  /**  */
  fileId: string;
}

export interface PreferenceLink {
  /**  */
  title: string;

  /**  */
  url: string;
}

export interface PreferenceDto {
  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  ordinal: number;

  /**  */
  title: string;

  /**  */
  subtitle: string;

  /**  */
  description: string;

  /**  */
  links: PreferenceLink[];
}

export interface UnitDto {
  /**  */
  id: string;

  /**  */
  createdAt: Date;

  /**  */
  updatedAt: Date;

  /**  */
  amiPercentage: string;

  /**  */
  annualIncomeMin: string;

  /**  */
  monthlyIncomeMin: string;

  /**  */
  floor: number;

  /**  */
  annualIncomeMax: string;

  /**  */
  maxOccupancy: number;

  /**  */
  minOccupancy: number;

  /**  */
  monthlyRent: string;

  /**  */
  numBathrooms: number;

  /**  */
  numBedrooms: number;

  /**  */
  number: string;

  /**  */
  priorityType: string;

  /**  */
  reservedType: string;

  /**  */
  sqFeet: string;

  /**  */
  status: string;

  /**  */
  unitType: string;

  /**  */
  amiChartId: number;

  /**  */
  monthlyRentAsPercentOfIncome: string;

  /**  */
  bmrProgramChart?: boolean;
}

export interface ListingEventDto {
  /**  */
  id: string;

  /**  */
  createdAt: Date;

  /**  */
  updatedAt: Date;

  /**  */
  type: EnumListingEventDtoType;

  /**  */
  startTime: Date;

  /**  */
  endTime: Date;

  /**  */
  url?: string;

  /**  */
  note?: string;
}

export interface User {
  /**  */
  id: string;

  /**  */
  passwordHash: string;

  /**  */
  email: string;

  /**  */
  firstName: string;

  /**  */
  middleName?: string;

  /**  */
  lastName: string;

  /**  */
  dob: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  applications: Application[];

  /**  */
  isAdmin: boolean;
}

export interface Preference {
  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  ordinal: number;

  /**  */
  title: string;

  /**  */
  subtitle: string;

  /**  */
  description: string;

  /**  */
  links: PreferenceLink[];

  /**  */
  listing: Listing;
}

export interface Unit {
  /**  */
  id: string;

  /**  */
  createdAt: Date;

  /**  */
  updatedAt: Date;

  /**  */
  amiPercentage: string;

  /**  */
  annualIncomeMin: string;

  /**  */
  monthlyIncomeMin: string;

  /**  */
  floor: number;

  /**  */
  annualIncomeMax: string;

  /**  */
  maxOccupancy: number;

  /**  */
  minOccupancy: number;

  /**  */
  monthlyRent: string;

  /**  */
  numBathrooms: number;

  /**  */
  numBedrooms: number;

  /**  */
  number: string;

  /**  */
  priorityType: string;

  /**  */
  reservedType: string;

  /**  */
  sqFeet: string;

  /**  */
  status: string;

  /**  */
  unitType: string;

  /**  */
  amiChartId: number;

  /**  */
  monthlyRentAsPercentOfIncome: string;

  /**  */
  listing: Listing;

  /**  */
  bmrProgramChart?: boolean;
}

export interface ApplicationMethod {
  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  type: EnumApplicationMethodType;

  /**  */
  label: string;

  /**  */
  externalReference: string;

  /**  */
  acceptsPostmarkedApplications: boolean;

  /**  */
  listing: Listing;
}

export interface Asset {
  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  label: string;

  /**  */
  fileId: string;

  /**  */
  listing: CombinedListingTypes;
}

export interface ListingEvent {
  /**  */
  id: string;

  /**  */
  createdAt: Date;

  /**  */
  updatedAt: Date;

  /**  */
  type: EnumListingEventType;

  /**  */
  startTime: Date;

  /**  */
  endTime: Date;

  /**  */
  url?: string;

  /**  */
  note?: string;

  /**  */
  listing: Listing;
}

export interface Address {
  /**  */
  placeName?: string;

  /**  */
  city: string;

  /**  */
  county?: string;

  /**  */
  state: string;

  /**  */
  street: string;

  /**  */
  street2?: string;

  /**  */
  zipCode: string;

  /**  */
  latitude?: number;

  /**  */
  longitude?: number;
}

export interface WhatToExpect {
  /**  */
  applicantsWillBeContacted: string;

  /**  */
  allInfoWillBeVerified: string;

  /**  */
  bePreparedIfChosen: string;
}

export interface Listing {
  /**  */
  unitsSummarized: UnitsSummarized;

  /**  */
  urlSlug: string;

  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  preferences: Preference[];

  /**  */
  units: Unit[];

  /**  */
  applicationMethods: ApplicationMethod[];

  /**  */
  assets: Asset[];

  /**  */
  events: ListingEvent[];

  /**  */
  applications: Application[];

  /**  */
  accessibility: string;

  /**  */
  amenities: string;

  /**  */
  applicationDueDate: string;

  /**  */
  applicationOpenDate: string;

  /**  */
  applicationFee: string;

  /**  */
  applicationOrganization: string;

  /**  */
  applicationAddress: CombinedApplicationAddressTypes;

  /**  */
  blankPaperApplicationCanBePickedUp: boolean;

  /**  */
  buildingAddress: CombinedBuildingAddressTypes;

  /**  */
  buildingTotalUnits: number;

  /**  */
  buildingSelectionCriteria: string;

  /**  */
  costsNotIncluded: string;

  /**  */
  creditHistory: string;

  /**  */
  criminalBackground: string;

  /**  */
  depositMin: string;

  /**  */
  depositMax: string;

  /**  */
  developer: string;

  /**  */
  disableUnitsAccordion: boolean;

  /**  */
  householdSizeMax: number;

  /**  */
  householdSizeMin: number;

  /**  */
  imageUrl: string;

  /**  */
  leasingAgentAddress: CombinedLeasingAgentAddressTypes;

  /**  */
  leasingAgentEmail: string;

  /**  */
  leasingAgentName: string;

  /**  */
  leasingAgentOfficeHours: string;

  /**  */
  leasingAgentPhone: string;

  /**  */
  leasingAgentTitle: string;

  /**  */
  name: string;

  /**  */
  neighborhood: string;

  /**  */
  petPolicy: string;

  /**  */
  postmarkedApplicationsReceivedByDate: string;

  /**  */
  programRules: string;

  /**  */
  rentalAssistance: string;

  /**  */
  rentalHistory: string;

  /**  */
  requiredDocuments: string;

  /**  */
  smokingPolicy: string;

  /**  */
  unitsAvailable: number;

  /**  */
  unitAmenities: string;

  /**  */
  waitlistCurrentSize: number;

  /**  */
  waitlistMaxSize: number;

  /**  */
  whatToExpect: CombinedWhatToExpectTypes;

  /**  */
  yearBuilt: number;

  /**  */
  status: EnumListingStatus;

  /**  */
  applicationConfig?: object;
}

export interface Applicant {
  /**  */
  firstName: string;

  /**  */
  middleName: string;

  /**  */
  lastName: string;

  /**  */
  birthMonth: number;

  /**  */
  birthDay: number;

  /**  */
  birthYear: number;

  /**  */
  emailAddress: string;

  /**  */
  noEmail: boolean;

  /**  */
  phoneNumber: string;

  /**  */
  phoneNumberType: string;

  /**  */
  noPhone: boolean;

  /**  */
  workInRegion: boolean;

  /**  */
  workAddress: Address;

  /**  */
  address: Address;
}

export interface AlternateContact {
  /**  */
  type: string;

  /**  */
  otherType: string;

  /**  */
  firstName: string;

  /**  */
  lastName: string;

  /**  */
  agency: string;

  /**  */
  phoneNumber: string;

  /**  */
  emailAddress: string;

  /**  */
  mailingAddress: Address;
}

export interface Accessibility {
  /**  */
  mobility: boolean;

  /**  */
  vision: boolean;

  /**  */
  hearing: boolean;
}

export interface Demographics {
  /**  */
  ethnicity: string;

  /**  */
  gender: string;

  /**  */
  sexualOrientation: string;

  /**  */
  howDidYouHear: string;

  /**  */
  race: string;
}

export interface HouseholdMember {
  /**  */
  id?: number;

  /**  */
  address: Address;

  /**  */
  firstName: string;

  /**  */
  middleName: string;

  /**  */
  lastName: string;

  /**  */
  birthMonth: number;

  /**  */
  birthDay: number;

  /**  */
  birthYear: number;

  /**  */
  emailAddress: string;

  /**  */
  noEmail: boolean;

  /**  */
  phoneNumber: string;

  /**  */
  phoneNumberType: string;

  /**  */
  noPhone: boolean;

  /**  */
  sameAddress?: boolean;

  /**  */
  relationship?: string;

  /**  */
  workInRegion?: boolean;

  /**  */
  workAddress?: Address;
}

export interface ApplicationData {
  /**  */
  applicant: Applicant;

  /**  */
  additionalPhone: boolean;

  /**  */
  additionalPhoneNumber: string;

  /**  */
  additionalPhoneNumberType: string;

  /**  */
  contactPreferences: string[];

  /**  */
  householdSize: number;

  /**  */
  housingStatus: string;

  /**  */
  sendMailToMailingAddress: boolean;

  /**  */
  mailingAddress: Address;

  /**  */
  alternateAddress: Address;

  /**  */
  alternateContact: AlternateContact;

  /**  */
  accessibility: Accessibility;

  /**  */
  demographics: Demographics;

  /**  */
  incomeVouchers: string;

  /**  */
  income: string;

  /**  */
  incomePeriod: string;

  /**  */
  householdMembers: HouseholdMember[];

  /**  */
  preferredUnit: string[];

  /**  */
  preferences: object;
}

export interface Application {
  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  appUrl: string;

  /**  */
  user: CombinedUserTypes;

  /**  */
  listing: Listing;

  /**  */
  application: ApplicationData;
}

export interface ListingDto {
  /**  */
  unitsSummarized: UnitsSummarized;

  /**  */
  urlSlug: string;

  /**  */
  applicationMethods: ApplicationMethodDto[];

  /**  */
  assets: AssetDto[];

  /**  */
  preferences: PreferenceDto[];

  /**  */
  units: UnitDto[];

  /**  */
  events: ListingEventDto[];

  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  applications: Application[];

  /**  */
  accessibility: string;

  /**  */
  amenities: string;

  /**  */
  applicationDueDate: string;

  /**  */
  applicationOpenDate: string;

  /**  */
  applicationFee: string;

  /**  */
  applicationOrganization: string;

  /**  */
  applicationAddress: CombinedApplicationAddressTypes;

  /**  */
  blankPaperApplicationCanBePickedUp: boolean;

  /**  */
  buildingAddress: CombinedBuildingAddressTypes;

  /**  */
  buildingTotalUnits: number;

  /**  */
  buildingSelectionCriteria: string;

  /**  */
  costsNotIncluded: string;

  /**  */
  creditHistory: string;

  /**  */
  criminalBackground: string;

  /**  */
  depositMin: string;

  /**  */
  depositMax: string;

  /**  */
  developer: string;

  /**  */
  disableUnitsAccordion: boolean;

  /**  */
  householdSizeMax: number;

  /**  */
  householdSizeMin: number;

  /**  */
  imageUrl: string;

  /**  */
  leasingAgentAddress: CombinedLeasingAgentAddressTypes;

  /**  */
  leasingAgentEmail: string;

  /**  */
  leasingAgentName: string;

  /**  */
  leasingAgentOfficeHours: string;

  /**  */
  leasingAgentPhone: string;

  /**  */
  leasingAgentTitle: string;

  /**  */
  name: string;

  /**  */
  neighborhood: string;

  /**  */
  petPolicy: string;

  /**  */
  postmarkedApplicationsReceivedByDate: string;

  /**  */
  programRules: string;

  /**  */
  rentalAssistance: string;

  /**  */
  rentalHistory: string;

  /**  */
  requiredDocuments: string;

  /**  */
  smokingPolicy: string;

  /**  */
  unitsAvailable: number;

  /**  */
  unitAmenities: string;

  /**  */
  waitlistCurrentSize: number;

  /**  */
  waitlistMaxSize: number;

  /**  */
  whatToExpect: CombinedWhatToExpectTypes;

  /**  */
  yearBuilt: number;

  /**  */
  status: EnumListingDtoStatus;

  /**  */
  applicationConfig?: object;
}

export interface ListingExtendedDto {
  /**  */
  status: EnumListingExtendedDtoStatus;

  /**  */
  listings: ListingDto[];

  /**  */
  amiCharts: object;
}

export interface IdDto {
  /**  */
  id: string;
}

export interface ListingCreateDto {
  /**  */
  unitsSummarized: UnitsSummarized;

  /**  */
  urlSlug: string;

  /**  */
  applicationMethods: IdDto[];

  /**  */
  assets: IdDto[];

  /**  */
  preferences: IdDto[];

  /**  */
  units: IdDto[];

  /**  */
  events: IdDto[];

  /**  */
  applications: Application[];

  /**  */
  accessibility: string;

  /**  */
  amenities: string;

  /**  */
  applicationDueDate: string;

  /**  */
  applicationOpenDate: string;

  /**  */
  applicationFee: string;

  /**  */
  applicationOrganization: string;

  /**  */
  applicationAddress: CombinedApplicationAddressTypes;

  /**  */
  blankPaperApplicationCanBePickedUp: boolean;

  /**  */
  buildingAddress: CombinedBuildingAddressTypes;

  /**  */
  buildingTotalUnits: number;

  /**  */
  buildingSelectionCriteria: string;

  /**  */
  costsNotIncluded: string;

  /**  */
  creditHistory: string;

  /**  */
  criminalBackground: string;

  /**  */
  depositMin: string;

  /**  */
  depositMax: string;

  /**  */
  developer: string;

  /**  */
  disableUnitsAccordion: boolean;

  /**  */
  householdSizeMax: number;

  /**  */
  householdSizeMin: number;

  /**  */
  imageUrl: string;

  /**  */
  leasingAgentAddress: CombinedLeasingAgentAddressTypes;

  /**  */
  leasingAgentEmail: string;

  /**  */
  leasingAgentName: string;

  /**  */
  leasingAgentOfficeHours: string;

  /**  */
  leasingAgentPhone: string;

  /**  */
  leasingAgentTitle: string;

  /**  */
  name: string;

  /**  */
  neighborhood: string;

  /**  */
  petPolicy: string;

  /**  */
  postmarkedApplicationsReceivedByDate: string;

  /**  */
  programRules: string;

  /**  */
  rentalAssistance: string;

  /**  */
  rentalHistory: string;

  /**  */
  requiredDocuments: string;

  /**  */
  smokingPolicy: string;

  /**  */
  unitsAvailable: number;

  /**  */
  unitAmenities: string;

  /**  */
  waitlistCurrentSize: number;

  /**  */
  waitlistMaxSize: number;

  /**  */
  whatToExpect: CombinedWhatToExpectTypes;

  /**  */
  yearBuilt: number;

  /**  */
  status: EnumListingCreateDtoStatus;

  /**  */
  applicationConfig?: object;
}

export interface ListingUpdateDto {
  /**  */
  unitsSummarized: UnitsSummarized;

  /**  */
  urlSlug: string;

  /**  */
  applicationMethods: IdDto[];

  /**  */
  assets: IdDto[];

  /**  */
  preferences: IdDto[];

  /**  */
  units: IdDto[];

  /**  */
  events: IdDto[];

  /**  */
  applications: Application[];

  /**  */
  accessibility: string;

  /**  */
  amenities: string;

  /**  */
  applicationDueDate: string;

  /**  */
  applicationOpenDate: string;

  /**  */
  applicationFee: string;

  /**  */
  applicationOrganization: string;

  /**  */
  applicationAddress: CombinedApplicationAddressTypes;

  /**  */
  blankPaperApplicationCanBePickedUp: boolean;

  /**  */
  buildingAddress: CombinedBuildingAddressTypes;

  /**  */
  buildingTotalUnits: number;

  /**  */
  buildingSelectionCriteria: string;

  /**  */
  costsNotIncluded: string;

  /**  */
  creditHistory: string;

  /**  */
  criminalBackground: string;

  /**  */
  depositMin: string;

  /**  */
  depositMax: string;

  /**  */
  developer: string;

  /**  */
  disableUnitsAccordion: boolean;

  /**  */
  householdSizeMax: number;

  /**  */
  householdSizeMin: number;

  /**  */
  imageUrl: string;

  /**  */
  leasingAgentAddress: CombinedLeasingAgentAddressTypes;

  /**  */
  leasingAgentEmail: string;

  /**  */
  leasingAgentName: string;

  /**  */
  leasingAgentOfficeHours: string;

  /**  */
  leasingAgentPhone: string;

  /**  */
  leasingAgentTitle: string;

  /**  */
  name: string;

  /**  */
  neighborhood: string;

  /**  */
  petPolicy: string;

  /**  */
  postmarkedApplicationsReceivedByDate: string;

  /**  */
  programRules: string;

  /**  */
  rentalAssistance: string;

  /**  */
  rentalHistory: string;

  /**  */
  requiredDocuments: string;

  /**  */
  smokingPolicy: string;

  /**  */
  unitsAvailable: number;

  /**  */
  unitAmenities: string;

  /**  */
  waitlistCurrentSize: number;

  /**  */
  waitlistMaxSize: number;

  /**  */
  whatToExpect: CombinedWhatToExpectTypes;

  /**  */
  yearBuilt: number;

  /**  */
  status: EnumListingUpdateDtoStatus;

  /**  */
  applicationConfig?: object;

  /**  */
  id: string;
}

export interface ApplicationDto {
  /**  */
  listing: IdDto;

  /**  */
  id: string;

  /**  */
  createdAt: string;

  /**  */
  updatedAt: string;

  /**  */
  appUrl: string;

  /**  */
  application: ApplicationData;
}

export interface ApplicationCreateDto {
  /**  */
  appUrl: string;

  /**  */
  application: ApplicationData;

  /**  */
  listing: IdDto;
}

export interface ApplicationUpdateDto {
  /**  */
  appUrl: string;

  /**  */
  application: ApplicationData;

  /**  */
  listing: IdDto;

  /**  */
  id: string;
}

export interface AssetCreateDto {
  /**  */
  label: string;

  /**  */
  fileId: string;
}

export interface AssetUpdateDto {
  /**  */
  label: string;

  /**  */
  fileId: string;

  /**  */
  id: string;
}

export interface PreferenceCreateDto {
  /**  */
  ordinal: number;

  /**  */
  title: string;

  /**  */
  subtitle: string;

  /**  */
  description: string;

  /**  */
  links: PreferenceLink[];
}

export interface PreferenceUpdateDto {
  /**  */
  ordinal: number;

  /**  */
  title: string;

  /**  */
  subtitle: string;

  /**  */
  description: string;

  /**  */
  links: PreferenceLink[];

  /**  */
  id: string;
}

export interface ApplicationMethodCreateDto {
  /**  */
  type: EnumApplicationMethodCreateDtoType;

  /**  */
  label: string;

  /**  */
  externalReference: string;

  /**  */
  acceptsPostmarkedApplications: boolean;
}

export interface ApplicationMethodUpdateDto {
  /**  */
  type: EnumApplicationMethodUpdateDtoType;

  /**  */
  label: string;

  /**  */
  externalReference: string;

  /**  */
  acceptsPostmarkedApplications: boolean;

  /**  */
  id: string;
}

export interface UnitCreateDto {
  /**  */
  amiPercentage: string;

  /**  */
  annualIncomeMin: string;

  /**  */
  monthlyIncomeMin: string;

  /**  */
  floor: number;

  /**  */
  annualIncomeMax: string;

  /**  */
  maxOccupancy: number;

  /**  */
  minOccupancy: number;

  /**  */
  monthlyRent: string;

  /**  */
  numBathrooms: number;

  /**  */
  numBedrooms: number;

  /**  */
  number: string;

  /**  */
  priorityType: string;

  /**  */
  reservedType: string;

  /**  */
  sqFeet: string;

  /**  */
  status: string;

  /**  */
  unitType: string;

  /**  */
  amiChartId: number;

  /**  */
  monthlyRentAsPercentOfIncome: string;

  /**  */
  bmrProgramChart?: boolean;
}

export interface UnitUpdateDto {
  /**  */
  amiPercentage: string;

  /**  */
  annualIncomeMin: string;

  /**  */
  monthlyIncomeMin: string;

  /**  */
  floor: number;

  /**  */
  annualIncomeMax: string;

  /**  */
  maxOccupancy: number;

  /**  */
  minOccupancy: number;

  /**  */
  monthlyRent: string;

  /**  */
  numBathrooms: number;

  /**  */
  numBedrooms: number;

  /**  */
  number: string;

  /**  */
  priorityType: string;

  /**  */
  reservedType: string;

  /**  */
  sqFeet: string;

  /**  */
  status: string;

  /**  */
  unitType: string;

  /**  */
  amiChartId: number;

  /**  */
  monthlyRentAsPercentOfIncome: string;

  /**  */
  bmrProgramChart?: boolean;

  /**  */
  id: string;
}

export interface ListingEventCreateDto {
  /**  */
  type: EnumListingEventCreateDtoType;

  /**  */
  startTime: Date;

  /**  */
  endTime: Date;

  /**  */
  url?: string;

  /**  */
  note?: string;
}

export interface ListingEventUpdateDto {
  /**  */
  type: EnumListingEventUpdateDtoType;

  /**  */
  startTime: Date;

  /**  */
  endTime: Date;

  /**  */
  url?: string;

  /**  */
  note?: string;

  /**  */
  id: string;
}
export enum EnumApplicationMethodDtoType {
  'Internal' = 'Internal',
  'FileDownload' = 'FileDownload',
  'ExternalLink' = 'ExternalLink',
  'PaperPickup' = 'PaperPickup',
  'POBox' = 'POBox',
  'LeasingAgent' = 'LeasingAgent'
}
export enum EnumListingEventDtoType {
  'openHouse' = 'openHouse',
  'publicLottery' = 'publicLottery'
}
export enum EnumApplicationMethodType {
  'Internal' = 'Internal',
  'FileDownload' = 'FileDownload',
  'ExternalLink' = 'ExternalLink',
  'PaperPickup' = 'PaperPickup',
  'POBox' = 'POBox',
  'LeasingAgent' = 'LeasingAgent'
}
export type CombinedListingTypes = (Listing & any) | null;
export enum EnumListingEventType {
  'openHouse' = 'openHouse',
  'publicLottery' = 'publicLottery'
}
export type CombinedApplicationAddressTypes = (Address & any) | null;
export type CombinedBuildingAddressTypes = (Address & any) | null;
export type CombinedLeasingAgentAddressTypes = (Address & any) | null;
export type CombinedWhatToExpectTypes = (WhatToExpect & any) | null;
export enum EnumListingStatus {
  'active' = 'active',
  'pending' = 'pending'
}
export type CombinedUserTypes = (User & any) | null;
export enum EnumListingDtoStatus {
  'active' = 'active',
  'pending' = 'pending'
}
export enum EnumListingExtendedDtoStatus {
  'ok' = 'ok'
}
export enum EnumListingCreateDtoStatus {
  'active' = 'active',
  'pending' = 'pending'
}
export enum EnumListingUpdateDtoStatus {
  'active' = 'active',
  'pending' = 'pending'
}
export enum EnumApplicationMethodCreateDtoType {
  'Internal' = 'Internal',
  'FileDownload' = 'FileDownload',
  'ExternalLink' = 'ExternalLink',
  'PaperPickup' = 'PaperPickup',
  'POBox' = 'POBox',
  'LeasingAgent' = 'LeasingAgent'
}
export enum EnumApplicationMethodUpdateDtoType {
  'Internal' = 'Internal',
  'FileDownload' = 'FileDownload',
  'ExternalLink' = 'ExternalLink',
  'PaperPickup' = 'PaperPickup',
  'POBox' = 'POBox',
  'LeasingAgent' = 'LeasingAgent'
}
export enum EnumListingEventCreateDtoType {
  'openHouse' = 'openHouse',
  'publicLottery' = 'publicLottery'
}
export enum EnumListingEventUpdateDtoType {
  'openHouse' = 'openHouse',
  'publicLottery' = 'publicLottery'
}
