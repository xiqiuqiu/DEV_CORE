import DigitalClock from './DigitalClock';

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-8">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-mono">
            © 2025 DEV_CORE
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground font-mono">
            ALL SYSTEMS NOMINAL
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-mono uppercase">
            LOCAL_TIME:
          </span>
          <DigitalClock />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
