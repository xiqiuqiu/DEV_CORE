"use client";

import { Mail, Github, Twitter } from "lucide-react";
import { useI18n } from '@/lib/i18n/context';

const ContactSection = () => {
  const { t } = useI18n();

  const contactLinks = [
    { icon: Mail, label: t.contact.email, href: "mailto:ixiqiuqiu@gmail.com", value: "ixiqiuqiu@gmail.com" },
    { icon: Github, label: t.contact.github, href: "https://github.com/xiqiuqiu", value: "@xiqiuqiu" },
    { icon: Twitter, label: t.contact.twitter, href: "https://twitter.com", value: "@logic_zy" },
  ];

  return (
    <section id="contact" className="py-24 px-8 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t.contact.title}</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-mono">[{t.contact.commLinks}]</span>
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
                <span className="font-bold truncate block">{link.value}</span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">{t.contact.cta}</p>
          <a href="mailto:hello@example.com" className="btn-industrial inline-flex items-center gap-3">
            <Mail size={20} />
            <span>{t.contact.initiateContact}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
