import { site, socials } from '../../content/site'
import { useI18n } from '../../i18n'
import { Container } from '../ui/Container'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container>
        <div className="footer__inner">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>

          <div className="link-row">
            {socials.map((social) => (
              <a
                key={social.id}
                className="link-inline"
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
            <a className="link-inline" href="#top">
              {t.footer.backToTop}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
