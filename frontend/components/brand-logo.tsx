import Link from "next/link"

const LIGHT_LOGO = "/Logo/erecord-logo-light.svg"
const DARK_LOGO = "/Logo/erecord-logo-dark.svg"

export default function BrandLogo({
  href,
  className = "h-10 w-auto",
}: {
  href?: string
  className?: string
}) {
  const mark = (
    <>
      <img src={LIGHT_LOGO} alt="eRecord" className={`${className} dark:hidden`} />
      <img src={DARK_LOGO} alt="" className={`${className} hidden dark:block`} />
    </>
  )

  if (!href) {
    return <span className="inline-flex items-center">{mark}</span>
  }

  return (
    <Link href={href} className="inline-flex items-center">
      {mark}
    </Link>
  )
}
