import {
  CombinedListingFilterParams,
  EnumListingFilterParamsStatus,
  OrderByFieldsEnum,
  OrderParam,
  PaginatedListing,
} from "@bloom-housing/backend-core"
import axios from "axios"
import qs from "qs"
import { ListingQueryBuilder } from "./listing-query-builder"

/**
 * Consolidates listing API calls into a single class
 * This class is client-side safe
 */
export class ListingService {
  listingsEndpoint: string
  searchEndpoint: string

  constructor(listingsEndpoint: string) {
    this.listingsEndpoint = listingsEndpoint
    this.searchEndpoint = listingsEndpoint + "/combined"
  }

  async fetchListingById(id: string, locale: string = null) {
    const request = {
      headers: null,
    }

    if (locale) {
      request.headers = { language: locale }
    }

    const response = await axios.get(`${this.listingsEndpoint}/${id}`, request)
    return response.data
  }

  async searchListings(qb: ListingQueryBuilder, limit = "all"): Promise<PaginatedListing> {
    let results = Promise.resolve({
      items: [],
      meta: {
        currentPage: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalItems: 0,
        totalPages: 0,
      },
    })

    const params: {
      view: string
      limit: string
      filter: CombinedListingFilterParams[]
      orderBy?: OrderByFieldsEnum[]
      orderDir?: OrderParam[]
    } = {
      view: "base",
      limit: limit,
      filter: qb.getFilterParams(),
    }

    const orderBy = qb.getOrderByParams()

    if (orderBy) {
      params.orderBy = orderBy.fields
      params.orderDir = orderBy.direction
    }

    console.log(params)

    try {
      const response = await axios.get(this.searchEndpoint, {
        params,
        paramsSerializer: (params) => {
          return qs.stringify(params)
        },
      })

      results = response.data
    } catch (e) {
      console.log("fetchBaseListingData error: ", e)
    }

    return results
  }

  fetchOpenListings() {
    const qb = new ListingQueryBuilder()

    qb.whereEqual("status", EnumListingFilterParamsStatus.active).addOrderBy(
      OrderByFieldsEnum.mostRecentlyPublished,
      OrderParam.DESC
    )

    return this.searchListings(qb)

    /*
    return this.searchListings({
      additionalFilters: [
        {
          $comparison: EnumListingFilterParamsComparison["="],
          status: EnumListingFilterParamsStatus.active,
        },
      ],
      orderBy: [OrderByFieldsEnum.mostRecentlyPublished],
      orderDir: [OrderParam.DESC],
    })
    */
  }
}
