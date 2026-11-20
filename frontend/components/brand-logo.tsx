import Link from "next/link"

const LIGHT_LOGO = "/Logo/erecord-logo-light.svg"
const DARK_LOGO = "/Logo/erecord-logo-dark.svg"

export default function BrandLogo({
  href,
  className = "h-14 w-auto",
  wide = false,
}: {
  href?: string
  className?: string
  wide?: boolean
}) {
  const mark = (
    <>
      <img src={LIGHT_LOGO} alt="eRecord" className={`${className} dark:hidden`} />
      <img src={DARK_LOGO} alt="" className={`${className} hidden dark:block`} />
    </>
  )
  const box = wide ? "block w-full" : "inline-flex items-center"

  if (!href) {
    return <span className={box}>{mark}</span>
  }

  return (
    <Link href={href} className={box}>
      {mark}
    </Link>
  )
}
