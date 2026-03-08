import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function ExhibitionShop() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section shop" id="shop">
      <div className="container">
        <h2 className="section-title">{tr.shopTitle}</h2>
        <p className="shop-desc">{tr.shopDesc}</p>
        <a href="#shop-view" className="btn-primary">{tr.shopCTA}</a>
      </div>
    </section>
  )
}
