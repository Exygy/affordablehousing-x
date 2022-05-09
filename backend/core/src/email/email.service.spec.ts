import { Test, TestingModule } from "@nestjs/testing"
import { SendGridModule, SendGridService } from "@anchan828/nest-sendgrid"
import { User } from "../auth/entities/user.entity"
import { EmailService } from "./email.service"
import { ConfigModule } from "@nestjs/config"
import { ArcherListing, Language } from "../../types"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { TranslationsService } from "../translations/services/translations.service"
import { Translation } from "../translations/entities/translation.entity"
import { Repository } from "typeorm"
import { REQUEST } from "@nestjs/core"

import dbOptions = require("../../ormconfig.test")
import { JurisdictionResolverService } from "../jurisdictions/services/jurisdiction-resolver.service"
import { JurisdictionsService } from "../jurisdictions/services/jurisdictions.service"
import { Jurisdiction } from "../jurisdictions/entities/jurisdiction.entity"
import { GeneratedListingTranslation } from "../translations/entities/generated-listing-translation.entity"
import { GoogleTranslateService } from "../translations/services/google-translate.service"

declare const expect: jest.Expect
jest.setTimeout(30000)
const user = new User()
user.firstName = "Test"
user.lastName = "User"
user.email = "test@xample.com"

const listing = Object.assign({}, ArcherListing)

const application = {
  applicant: { emailAddress: "test@xample.com", firstName: "Test", lastName: "User" },
  id: "abcdefg",
  confirmationCode: "abc123",
}
let sendMock

describe("EmailService", () => {
  let service: EmailService
  let module: TestingModule
  let sendGridService: SendGridService

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dbOptions),
        TypeOrmModule.forFeature([Translation, Jurisdiction, GeneratedListingTranslation]),
        ConfigModule,
        SendGridModule.forRoot({
          apikey: "SG.fake",
        }),
      ],
      providers: [
        EmailService,
        TranslationsService,
        JurisdictionsService,
        GoogleTranslateService,
        JurisdictionResolverService,
        {
          provide: REQUEST,
          useValue: {
            get: () => {
              return "Alameda"
            },
          },
        },
      ],
    }).compile()

    const jurisdictionService = await module.resolve<JurisdictionsService>(JurisdictionsService)
    const jurisdiction = await jurisdictionService.findOne({ where: { name: "Alameda" } })

    const translationsRepository = module.get<Repository<Translation>>(
      getRepositoryToken(Translation)
    )
    await translationsRepository.createQueryBuilder().delete().execute()
    const translationsService = await module.resolve<TranslationsService>(TranslationsService)

    await translationsService.create({
      jurisdiction: {
        id: null,
      },
      language: Language.en,
      translations: {
        footer: {
          footer: "Generic footer",
          thankYou: "Thank you!",
        },
      },
    })

    await translationsService.create({
      jurisdiction: {
        id: jurisdiction.id,
      },
      language: Language.en,
      translations: {
        confirmation: {
          gotYourConfirmationNumber: "We got your application for",
          yourConfirmationNumber: "Your Confirmation Number", // UPDATED
          applicationReceived: 'Application <br />received<span class="sr-only"> completed</span>',
          applicationsClosed: 'Application <br />closed<span class="sr-only"> not completed</span>',
          applicationsRanked: 'Application <br />ranked<span class="sr-only"> not completed</span>',
          whatHappensNext: "What happens next?",
          applicationPeriodCloses:
            "Once the application period closes, the property manager will begin processing applications.",
          eligibleApplicants: {
            FCFS:
              "Eligible applicants will be placed in order based on <strong>first come first serve</strong> basis.",
            lottery:
              "The lottery will be held on %{lotteryDate}. Eligible applicants will be contacted by the agent in lottery rank order until vacancies are filled.",
          },
          contactedForAnInterview:
            "If you are contacted for an interview, you will need to fill out a more detailed application and provide supporting documents.",
          prepareForNextSteps: "Prepare for next steps",
          whileYouWait:
            "While you wait, there are things you can do to prepare for potential next steps and future opportunities.",
          readHowYouCanPrepare: "Read about how you can prepare for next steps",
          needToMakeUpdates: "Need to make updates?",
          ifYouNeedToUpdateInformation: "",

          shouldBeChosen:
            "Should your application be chosen, be prepared to fill out a more detailed application and provide required supporting documents.",
          subject: "Your Application Confirmation",
          thankYouForApplying: "Thanks for applying. We have received your application for",
          whatToExpectNext: "What to expect next:",
          whatToExpect: {
            FCFS:
              "Applicants will be contacted by the property agent on a first come first serve basis until vacancies are filled.",
            lottery:
              "The lottery will be held on %{lotteryDate}. Applicants will be contacted by the agent in lottery rank order until vacancies are filled.",
            noLottery:
              "Applicants will be contacted by the agent in waitlist order until vacancies are filled.",
          },
        },
        footer: {
          callToAction: "How are we doing? We'd like to get your ",
          callToActionUrl:
            "https://docs.google.com/forms/d/e/1FAIpQLScr7JuVwiNW8q-ifFUWTFSWqEyV5ndA08jAhJQSlQ4ETrnl9w/viewform",
          feedback: "feedback",
          footer: "Alameda County - Housing and Community Development (HCD) Department",
          line1: "Alameda County Housing Portal is a project of the",
          line2: "Alameda County - Housing and Community Development (HCD) Department",
          thankYou: "Thank you",
        },
        forgotPassword: {
          callToAction:
            "If you did make this request, please click on the link below to reset your password:",
          changePassword: "Change my password",
          ignoreRequest: "If you didn't request this, please ignore this email.",
          passwordInfo:
            "Your password won't change until you access the link above and create a new one.",
          resetRequest:
            "A request to reset your Bloom Housing Portal website password for %{appUrl} has recently been made.",
          subject: "Forgot your password?",
        },
        leasingAgent: {
          contactAgentToUpdateInfo:
            "If you need to update information on your application, do not apply again. Instead, contact the agent for this listing.", // UPDATED"
          propertyManager: "Property Manager",
          officeHours: "Office Hours:",
        },
        register: {
          confirmMyAccount: "Confirm my account",
          toConfirmAccountMessage:
            "To complete your account creation, please click the link below:",
          welcome: "Welcome",
          welcomeMessage:
            "Thank you for setting up your account on %{appUrl}. It will now be easier for you to start, save, and submit online applications for listings that appear on the site.",
        },
        t: {
          hello: "Hello",
          seeListing: "See Listing",
        },
      },
    })
  })

  beforeEach(async () => {
    jest.useFakeTimers()
    sendGridService = module.get<SendGridService>(SendGridService)
    sendMock = jest.fn()
    sendGridService.send = sendMock
    service = await module.resolve(EmailService)
  })

  it("should be defined", async () => {
    const service = await module.resolve(EmailService)
    expect(service).toBeDefined()
  })

  describe("welcome", () => {
    it("should generate html body, jurisdictional footer", async () => {
      await service.welcome(user, "http://localhost:3000", "http://localhost:3000/?token=")
      expect(sendMock).toHaveBeenCalled()
      expect(sendMock.mock.calls[0][0].to).toEqual(user.email)
      expect(sendMock.mock.calls[0][0].subject).toEqual("Welcome")
      // Check if translation is working correctly
      expect(sendMock.mock.calls[0][0].html).toContain(
        "Alameda County - Housing and Community Development (HCD) Department"
      )
      expect(sendMock.mock.calls[0][0].html).toContain("<h1>Hello Test \n User</h1>")
    })
  })

  describe("confirmation", () => {
    it("should generate html body", async () => {
      const service = await module.resolve(EmailService)
      // TODO Remove BaseEntity from inheritance from all entities
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await service.confirmation(listing, application, "http://localhost:3000")

      expect(sendMock).toHaveBeenCalled()
      const emailMock = sendMock.mock.calls[0][0]
      expect(emailMock.to).toEqual(user.email)
      expect(emailMock.subject).toEqual("Your Application Confirmation")
      console.info(emailMock.html)
      expect(emailMock.html).toMatch("Your Confirmation Number")
      expect(emailMock.html).toMatch("Marisela Baca")
      expect(emailMock.html).toMatch(
        /Eligible applicants will be placed in order based on \<strong\>first come first serve\<\/strong\> basis./
      )
      expect(emailMock.html).toMatch(/http:\/\/localhost:3000\/listing\/Uvbk5qurpB2WI9V6WnNdH/)
      // contains application id
      expect(emailMock.html).toMatch(/abc123/)
    })
  })

  afterAll(async () => {
    await module.close()
  })
})
