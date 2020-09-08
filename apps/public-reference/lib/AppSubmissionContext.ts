import React from "react"
import ApplicationConductor from "./ApplicationConductor"

export const retrieveApplicationConfig = () => {
  // Note: this whole function will eventually be replaced with one that reads this from the backend.
  return {
    sections: ["You", "Household", "Income", "Preferences", "Review"],
    languages: ["en", "zh"],
    steps: [
      {
        name: "Choose Language",
        url: "/applications/start/choose-language",
        nextUrl: "/applications/start/what-to-expect",
      },

      {
        name: "What to Expect",
        url: "/applications/start/what-to-expect",
        nextUrl: "/applications/contact/name",
      },

      {
        name: "Primary Applicant Name",
        url: "/applications/contact/name",
        nextUrl: "/applications/contact/address",
      },

      {
        name: "Primary Applicant Address",
        url: "/applications/contact/address",
        nextUrl: "/applications/contact/alternate-contact-type",
      },

      {
        name: "Alternate Contact Type",
        url: "/applications/contact/alternate-contact-type",
        nextUrl: "/applications/contact/alternate-contact-name",
      },

      {
        name: "Alternate Contact Name",
        url: "/applications/contact/alternate-contact-name",
        skipIf: [{ condition: "noAlternateContact", skipTo: "/applications/household/live-alone" }],
        nextUrl: "/applications/contact/alternate-contact-contact",
      },

      {
        name: "Alternate Contact Info",
        url: "/applications/contact/alternate-contact-contact",
        skipIf: [{ condition: "noAlternateContact", skipTo: "/applications/household/live-alone" }],
        nextUrl: "/applications/household/live-alone",
      },

      {
        name: "Live Alone",
        url: "/applications/contact/household/live-alone",
        nextUrl: "/applications/household/members-info",
      },
    ],
  }
}

export const blankApplication = () => {
  return {
    loaded: false,
    completedSections: 0,
    applicant: {
      firstName: "",
      middleName: "",
      lastName: "",
      birthMonth: 0,
      birthDay: 0,
      birthYear: 0,
      emailAddress: "",
      noEmail: false,
      phoneNumber: "",
      phoneNumberType: "",
      noPhone: false,
      workInRegion: null,
      address: {
        street: "",
        street2: "",
        city: "",
        state: "",
        zipCode: "",
        county: "",
        latitude: null,
        longitude: null,
      },
      workAddress: {
        street: "",
        street2: "",
        city: "",
        state: "",
        zipCode: "",
        county: "",
        latitude: null,
        longitude: null,
      },
    },
    additionalPhone: false,
    additionalPhoneNumber: "",
    additionalPhoneNumberType: "",
    contactPreferences: [],
    householdSize: 0,
    housingStatus: "",
    sendMailToMailingAddress: false,
    mailingAddress: {
      street: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    alternateAddress: {
      street: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    alternateContact: {
      type: "",
      otherType: "",
      firstName: "",
      lastName: "",
      agency: "",
      phoneNumber: "",
      emailAddress: "",
      mailingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
    accessibility: {
      mobility: null,
      vision: null,
      hearing: null,
    },
    incomeVouchers: null,
    income: null,
    incomePeriod: null,
    householdMembers: [],
    preferredUnit: [],
    demographics: {
      ethnicity: "",
      gender: "",
      sexualOrientation: "",
      howDidYouHear: "",
    },
    preferences: {} as Record<string, any>,
  }
}

export const AppSubmissionContext = React.createContext({
  conductor: {} as ApplicationConductor,
  application: blankApplication(),
  listing: null,
  /* eslint-disable */
  syncApplication: (data) => {},
  syncListing: (data) => {},
})
