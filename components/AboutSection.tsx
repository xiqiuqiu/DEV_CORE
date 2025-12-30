const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">ABOUT</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-mono">
            [BIO_DATA]
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio text */}
          <div className="border-l-4 border-primary pl-6 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a full-stack developer with 7+ years of experience building 
              high-performance web applications and distributed systems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My expertise spans from crafting pixel-perfect user interfaces to 
              architecting scalable backend infrastructure. I'm passionate about 
              clean code, system design, and pushing the boundaries of what's 
              possible on the web.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When not coding, I contribute to open-source projects and write 
              technical articles about software architecture and best practices.
            </p>
          </div>

          {/* Stats/Info */}
          <div className="space-y-6">
            <div className="border border-border p-6">
              <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                CURRENT STATUS
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-terminal animate-pulse" />
                <span className="font-bold">Senior Software Engineer</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Building developer tools and infrastructure
              </p>
            </div>

            <div className="border border-border p-6">
              <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                METRICS
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-3xl font-bold text-primary">7+</span>
                  <p className="text-xs text-muted-foreground uppercase">Years Exp</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-primary">50+</span>
                  <p className="text-xs text-muted-foreground uppercase">Projects</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-primary">12k</span>
                  <p className="text-xs text-muted-foreground uppercase">Commits</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-primary">∞</span>
                  <p className="text-xs text-muted-foreground uppercase">Coffee</p>
                </div>
              </div>
            </div>

            <div className="stamp inline-block">
              OPEN TO OPPORTUNITIES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
