import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const contactLinks = [
  { icon: Mail, label: 'EMAIL', href: 'mailto:hello@example.com', value: 'hello@example.com' },
  { icon: Github, label: 'GITHUB', href: 'https://github.com', value: '@devcore' },
  { icon: Linkedin, label: 'LINKEDIN', href: 'https://linkedin.com', value: 'in/devcore' },
  { icon: Twitter, label: 'TWITTER', href: 'https://twitter.com', value: '@devcore' },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-8 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">CONTACT</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-mono">
            [COMM_LINKS]
          </span>
        </div>

        {/* Contact grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-industrial flex items-center gap-4 text-left"
            >
              <link.icon size={24} className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-muted-foreground group-hover:text-primary-foreground transition-colors block">
                  {link.label}
                </span>
                <span className="font-bold truncate block">
                  {link.value}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Ready to build something extraordinary together?
          </p>
          <a 
            href="mailto:hello@example.com"
            className="btn-industrial inline-flex items-center gap-3"
          >
            <Mail size={20} />
            <span>INITIATE CONTACT</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
