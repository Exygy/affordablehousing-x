import * as React from "react"
import "./Icon.scss"
import {
  Application,
  ArrowBack,
  ArrowDown,
  Assistance,
  Asterisk,
  Bed,
  Browse,
  Building,
  Calendar,
  Check,
  Clock,
  Close,
  CloseRound,
  Cross,
  Down,
  Download,
  Edit,
  Eligibility,
  Eye,
  Favorite,
  File,
  Forward,
  Globe,
  Info,
  Left,
  Lightbulb,
  Like,
  LikeFill,
  Link,
  List,
  Lock,
  Mail,
  Map,
  MapThin,
  Menu,
  Oval,
  Phone,
  Plus,
  Polygon,
  Profile,
  Question,
  Result,
  Right,
  Search,
  Settings,
  Spinner,
  Star,
  Ticket,
  Trash,
  Warning,
} from "./Icons"

const IconMap = {
  application: Application,
  arrowBack: ArrowBack,
  arrowDown: ArrowDown,
  assistance: Assistance,
  asterisk: Asterisk,
  bed: Bed,
  browse: Browse,
  building: Building,
  calendar: Calendar,
  check: Check,
  clock: Clock,
  close: Close,
  closeRound: CloseRound,
  cross: Cross,
  down: Down,
  download: Download,
  edit: Edit,
  eligibility: Eligibility,
  eye: Eye,
  favorite: Favorite,
  file: File,
  forward: Forward,
  globe: Globe,
  info: Info,
  left: Left,
  lightbulb: Lightbulb,
  like: Like,
  likeFill: LikeFill,
  link: Link,
  list: List,
  lock: Lock,
  mail: Mail,
  map: Map,
  mapThin: MapThin,
  menu: Menu,
  oval: Oval,
  phone: Phone,
  plus: Plus,
  polygon: Polygon,
  profile: Profile,
  question: Question,
  result: Result,
  right: Right,
  search: Search,
  settings: Settings,
  spinner: Spinner,
  star: Star,
  ticket: Ticket,
  trash: Trash,
  warning: Warning,
}

export type IconTypes = keyof typeof IconMap

export type IconFill = "white" | "primary"

const IconFillColors = {
  white: "#ffffff",
  primary: "#0077DA",
}

export interface IconProps {
  size: "tiny" | "small" | "medium" | "large" | "xlarge" | "2xl" | "3xl"
  symbol: IconTypes
  className?: string
  fill?: IconFill
}

const Icon = (props: IconProps) => {
  const wrapperClasses = ["ui-icon", "relative"]
  wrapperClasses.push(`ui-${props.size}`)
  if (props.className) wrapperClasses.push(props.className)
  if (props.symbol == "spinner") wrapperClasses.push("spinner-animation")

  const SpecificIcon = IconMap[props.symbol]

  return (
    <span className={wrapperClasses.join(" ")}>
      <SpecificIcon fill={props.fill ? IconFillColors[props.fill] : undefined} />
    </span>
  )
}

export { Icon as default, Icon }
