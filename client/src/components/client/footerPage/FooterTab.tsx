import { Link } from "react-router-dom"

type Props = {
  data: IFooterTab
}

const FooterTab = ({ data }: Props) => {
  return (
    <div>
      <h4 className="max-sm:text-lg max-sm:mb-2">{data.title}</h4>
      <ul>
        {data.children.slice().sort((a, b) => a.index - b.index).map(v => (
          <li key={v.id} className="text-sm opacity-60 hover:opacity-90 mb-1 max-sm:text-base max-sm:mb-3">
            <Link to={v.link || ""} target={v.link && v.link?.length > 1 ? "_blank" : "_self"}>{v.title}</Link>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default FooterTab