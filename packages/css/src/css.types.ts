import { Pseudos } from "@chakra-ui/parser"
import { Omit } from "@chakra-ui/utils"
import {
  BoxShadowProperty,
  FontWeightProperty,
  PropertiesFallback,
  Pseudos as CSSPseudos,
  StandardProperties,
  SvgProperties,
  ZIndexProperty,
} from "csstype"

type CSS = PropertiesFallback<number | string>

type Responsive<T> = T | Array<T | null>

type CSSProperties = StandardProperties<number | string> &
  SvgProperties<number | string>

type CSSPseudoStyles = {
  [K in CSSPseudos]?: SystemStyleObject
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudosForCSSObject,
    CSSOthersObjectForCSSObject {}

type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K]
}

type CSSPseudosForCSSObject = { [K in CSSPseudos]?: CSSObject }

type CSSInterpolation = undefined | number | string | CSSObject

interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation
}

interface CSSSelectorStyles {
  [cssSelector: string]: SystemStyleObject
}
interface AliasesCSSProperties {
  bg?: CSS["background"]
  bgColor?: CSS["backgroundColor"]
  bgImage?: CSS["backgroundImage"]
  bgSize?: CSS["backgroundSize"]
  bgPosition?: CSS["backgroundPosition"]
  bgRepeat?: CSS["backgroundRepeat"]
  bgAttachment?: CSS["backgroundAttachment"]
  borderX?: CSS["border"]
  borderY?: CSS["border"]
  borderTopRadius?: CSS["borderRadius"]
  borderBottomRadius?: CSS["borderRadius"]
  borderLeftRadius?: CSS["borderRadius"]
  borderRightRadius?: CSS["borderRadius"]
  textColor?: CSS["color"]
  flexDir?: CSS["flexDirection"]
  w?: CSS["width"]
  h?: CSS["height"]
  minW?: CSS["minWidth"]
  maxW?: CSS["maxWidth"]
  minH?: CSS["minHeight"]
  maxH?: CSS["maxHeight"]
  m?: CSS["margin"]
  mt?: CSS["marginTop"]
  mr?: CSS["marginRight"]
  mb?: CSS["marginBottom"]
  ml?: CSS["marginLeft"]
  mx?: CSS["marginLeft"]
  pos?: CSS["position"]
  inset?: CSS["left"]
  insetX?: CSS["left"]
  insetY?: CSS["top"]
  marginX?: CSS["marginLeft"]
  my?: CSS["marginTop"]
  marginY?: CSS["marginTop"]
  p?: CSS["padding"]
  pt?: CSS["paddingTop"]
  pr?: CSS["paddingRight"]
  pb?: CSS["paddingBottom"]
  pl?: CSS["paddingLeft"]
  px?: CSS["paddingLeft"]
  paddingX?: CSS["paddingLeft"]
  py?: CSS["paddingTop"]
  paddingY?: CSS["paddingTop"]
  textDecor?: CSS["textDecoration"]
}

interface OverwriteCSSProperties {
  boxShadow?: BoxShadowProperty | number
  fontWeight?: FontWeightProperty | string
  zIndex?: ZIndexProperty | string
}

interface AllSystemCSSProperties
  extends Omit<CSSProperties, "boxShadow" | "fontWeight" | "zIndex" | "inset">,
    AliasesCSSProperties,
    OverwriteCSSProperties {}

type SystemCSSProperties = {
  [K in keyof AllSystemCSSProperties]:
    | string
    | Responsive<AllSystemCSSProperties[K]>
    | ((theme: any) => Responsive<AllSystemCSSProperties[K]>)
    | SystemStyleObject
}

interface ApplyPropStyles {
  apply: string
}

type PseudoStyles = {
  [K in keyof Pseudos]?: K extends "_before" | "_after"
    ? SystemStyleObject & { content?: string }
    : SystemStyleObject
}

export type SystemStyleObject =
  | SystemCSSProperties
  | CSSPseudoStyles
  | CSSSelectorStyles
  | ApplyPropStyles
  | PseudoStyles

export type StyleObjectOrFn =
  | SystemStyleObject
  | ((theme: any) => SystemStyleObject)
