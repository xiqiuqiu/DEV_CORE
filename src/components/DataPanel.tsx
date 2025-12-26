import LiveTerminal from './LiveTerminal';
import FrequencyChart from './FrequencyChart';

const telemetryData = [
  { label: 'UPTIME', value: '99.9%' },
  { label: 'LATENCY', value: '12ms' },
  { label: 'THROUGHPUT', value: '847 req/s' },
  { label: 'MEMORY', value: '256MB' },
];

const DataPanel = () => {
  return (
    <aside className="hidden lg:block fixed right-0 top-14 bottom-0 w-72 xl:w-80 border-l border-border bg-card text-card-foreground overflow-y-auto z-30">
      {/* Header */}
      <div className="p-4 border-b border-border bg-primary text-primary-foreground">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          TELEMETRY DATA
        </h3>
        <p className="text-xs opacity-80 mt-1">REAL-TIME SYSTEM METRICS</p>
      </div>

      {/* Telemetry rows */}
      <div className="p-4 border-b border-border">
        {telemetryData.map((item) => (
          <div key={item.label} className="data-row text-card-foreground">
            <span className="text-xs opacity-70">{item.label}</span>
            <span className="font-bold">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Frequency visualization */}
      <div className="p-4 border-b border-border">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-card-foreground">
          FREQ ANALYSIS
        </h4>
        <FrequencyChart />
      </div>

      {/* Live terminal */}
      <div className="p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-card-foreground">
          SYSTEM LOG
        </h4>
        <div className="bg-background p-3 border border-border">
          <LiveTerminal />
        </div>
      </div>
    </aside>
  );
};

export default DataPanel;
