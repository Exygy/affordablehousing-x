import * as React from "react"
import Head from "next/head"
import {
  LocalizedLink,
  SiteHeader,
  SiteFooter,
  FooterNav,
  FooterSection,
  ExygyFooter,
  t,
} from "@bloom-housing/ui-components"
import SVG from "react-inlinesvg"

const Layout = (props) => (
  <div className="site-wrapper">
    <div className="site-content site-content--wide-content">
      <Head>
        <title>{t("nav.siteTitle")}</title>
      </Head>
      <SiteHeader
        skip={t("nav.skip")}
        logoSrc="/images/logo_glyph.svg"
        notice=""
        title={t("nav.siteTitle")}
      >
        <LocalizedLink href="/" className="navbar-item">
          {t("nav.listings")}
        </LocalizedLink>
      </SiteHeader>
      <main>{props.children}</main>

      <SiteFooter>
        <FooterNav copyright="© 2020 • All Rights Reserved">
          <LocalizedLink href="/privacy">{t("pageTitle.privacy")}</LocalizedLink>
          <LocalizedLink href="/disclaimer">{t("pageTitle.disclaimer")}</LocalizedLink>
        </FooterNav>
        <FooterSection className="bg-black" small>
          <ExygyFooter />
        </FooterSection>
      </SiteFooter>
      <SVG src="/images/icons.svg" />
    </div>
  </div>
)

export default Layout
