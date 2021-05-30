import React, { useMemo } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AgGridReact } from "ag-grid-react"

import { useFlaggedApplicationsList, useSingleListingData } from "../../../../lib/hooks"
import Layout from "../../../../layouts/application"
import { t, ApplicationSecondaryNav } from "@bloom-housing/ui-components"
import { getCols } from "../../../../src/flags/flagSetsCols"

const FlagsPage = () => {
  const router = useRouter()
  const listingId = router.query.id as string

  const { listingDto } = useSingleListingData(listingId)

  const { data } = useFlaggedApplicationsList({
    listingId,
  })

  const listingName = listingDto?.name

  const defaultColDef = {
    resizable: true,
    maxWidth: 300,
  }

  const columns = useMemo(() => getCols(), [])

  const StatusTag = () => <strong>test</strong>

  const frameworkComponents = {
    statusTag: StatusTag,
  }

  if (!data) return null

  return (
    <Layout>
      <Head>
        <title>{t("nav.siteTitle")}</title>
      </Head>

      <ApplicationSecondaryNav
        title={listingName}
        listingId={listingId}
        flagsQty={data?.meta?.totalFlagged}
      />

      <article className="flex-row flex-wrap relative max-w-screen-xl mx-auto py-8 px-4 w-full">
        <div className="ag-theme-alpine ag-theme-bloom">
          <div className="applications-table mt-5">
            <AgGridReact
              columnDefs={columns}
              rowData={data?.items}
              domLayout="autoHeight"
              headerHeight={83}
              rowHeight={58}
              defaultColDef={defaultColDef}
              suppressScrollOnNewData={true}
              frameworkComponents={frameworkComponents}
              immutableData={true}
              getRowNodeId={(data) => data.row}
            ></AgGridReact>

            <div className="data-pager">
              <div className="data-pager__control-group">
                <span className="data-pager__control">
                  <span className="field-label" id="lbTotalPages">
                    {data?.items?.length}
                  </span>
                  <span className="field-label">{t("flags.totalSets")}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default FlagsPage
