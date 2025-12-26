import { useState, useCallback, useRef } from 'react';

export interface TerminalLog {
  id: string;
  type: 'cmd' | 'sys' | 'err' | 'output' | 'ascii';
  content: string;
  timestamp?: string;
}

interface CommandHandler {
  description: string;
  handler: (args: string[], addLog: (log: Omit<TerminalLog, 'id'>) => void) => void | Promise<void>;
}

// Portfolio data
const projects = [
  { name: 'brutalist-ui', tech: 'React, Tailwind, Framer', status: 'LIVE', year: '2024' },
  { name: 'data-viz-platform', tech: 'D3.js, Canvas, WebGL', status: 'LIVE', year: '2024' },
  { name: 'cli-portfolio', tech: 'Vue, TypeScript, GSAP', status: 'DEV', year: '2024' },
  { name: 'design-system', tech: 'Storybook, CSS-in-JS', status: 'LIVE', year: '2023' },
];

const skills = [
  { skill: 'Frontend', level: 95, tech: 'React/Vue/TypeScript' },
  { skill: 'UI/UX Design', level: 88, tech: 'Figma/Principle' },
  { skill: 'Animation', level: 92, tech: 'GSAP/Framer/CSS' },
  { skill: 'DevOps', level: 75, tech: 'Docker/CI-CD/AWS' },
  { skill: 'Backend', level: 70, tech: 'Node.js/Python' },
];

const dockerContainers = [
  { id: 'a1b2c3d4', name: 'portfolio-web', status: 'Up 42h', ports: '0.0.0.0:3000->3000' },
  { id: 'e5f6g7h8', name: 'nginx-proxy', status: 'Up 42h', ports: '0.0.0.0:80->80' },
  { id: 'i9j0k1l2', name: 'redis-cache', status: 'Up 42h', ports: '6379/tcp' },
];

export const useTerminal = (onThemeChange?: (theme: string) => void) => {
  const [logs, setLogs] = useState<TerminalLog[]>(() => {
    const savedTheme = localStorage.getItem('user-theme');
    const initLogs: TerminalLog[] = [
      { id: '0', type: 'sys', content: '> SYSTEM INITIALIZED' },
    ];
    
    if (savedTheme && ['dark', 'light', 'minimal'].includes(savedTheme)) {
      initLogs.push({ id: '1', type: 'sys', content: `> Loading saved theme: ${savedTheme.toUpperCase()}...` });
      // Apply saved theme on mount
      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', savedTheme);
        onThemeChange?.(savedTheme);
      }, 100);
    }
    
    initLogs.push({ id: '2', type: 'sys', content: '> Type "help" for available commands' });
    return initLogs;
  });
  const [inputValue, setInputValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const commandHistory = useRef<string[]>([]);
  const idCounter = useRef(3);

  const addLog = useCallback((log: Omit<TerminalLog, 'id'>) => {
    const newLog: TerminalLog = {
      ...log,
      id: String(idCounter.current++),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  // Typewriter effect helper
  const typewriterOutput = useCallback((lines: string[], delay = 30) => {
    lines.forEach((line, index) => {
      setTimeout(() => {
        addLog({ type: 'output', content: line });
      }, index * delay);
    });
  }, [addLog]);

  // Command handlers using strategy pattern
  const commandMap: Record<string, CommandHandler> = {
    help: {
      description: 'Show available commands',
      handler: (_, addLog) => {
        const helpLines = [
          '╔════════════════════════════════════════╗',
          '║         AVAILABLE COMMANDS             ║',
          '╠════════════════════════════════════════╣',
          '║ help          - Show this help menu    ║',
          '║ clear         - Clear terminal         ║',
          '║ whoami        - Display profile        ║',
          '║ ls [-l]       - List projects          ║',
          '║ cat <project> - Project details        ║',
          '║ docker ps     - Show containers        ║',
          '║ sql "query"   - Query skills DB        ║',
          '║ theme <mode>  - dark/light/minimal     ║',
          '║ neofetch      - System info            ║',
          '╚════════════════════════════════════════╝',
        ];
        helpLines.forEach(line => addLog({ type: 'output', content: line }));
      },
    },
    clear: {
      description: 'Clear terminal',
      handler: () => {
        setLogs([{ id: String(idCounter.current++), type: 'sys', content: '> Terminal cleared' }]);
      },
    },
    whoami: {
      description: 'Display profile information',
      handler: (_, addLog) => {
        const lines = [
          '┌─────────────────────────────────────┐',
          '│  OPERATOR: Creative Developer       │',
          '│  ROLE: UI Engineer + Designer       │',
          '│  STACK: React / Vue / TypeScript    │',
          '│  STATUS: Available for projects     │',
          '│  LOCATION: Remote / Global          │',
          '└─────────────────────────────────────┘',
        ];
        lines.forEach(line => addLog({ type: 'output', content: line }));
      },
    },
    ls: {
      description: 'List projects',
      handler: (args, addLog) => {
        const isLong = args.includes('-l') || args.includes('/projects');
        if (isLong) {
          addLog({ type: 'output', content: 'drwxr-xr-x  PROJECTS/' });
          addLog({ type: 'output', content: '─────────────────────────────────────────' });
          projects.forEach(p => {
            const status = p.status === 'LIVE' ? '\x1b[32m●\x1b[0m' : '\x1b[33m○\x1b[0m';
            addLog({ type: 'output', content: `${status} ${p.name.padEnd(20)} ${p.tech.padEnd(25)} [${p.year}]` });
          });
        } else {
          addLog({ type: 'output', content: projects.map(p => p.name).join('  ') });
        }
      },
    },
    cat: {
      description: 'Show project details',
      handler: (args, addLog) => {
        const projectName = args[0]?.toLowerCase();
        const project = projects.find(p => p.name.toLowerCase() === projectName);
        if (!project) {
          addLog({ type: 'err', content: `cat: ${projectName || 'undefined'}: No such project` });
          addLog({ type: 'sys', content: 'Available: ' + projects.map(p => p.name).join(', ') });
          return;
        }
        addLog({ type: 'output', content: `╭─ ${project.name.toUpperCase()} ─────────────────────╮` });
        addLog({ type: 'output', content: `│ Stack: ${project.tech}` });
        addLog({ type: 'output', content: `│ Status: ${project.status}` });
        addLog({ type: 'output', content: `│ Year: ${project.year}` });
        addLog({ type: 'output', content: `╰────────────────────────────────────╯` });
      },
    },
    docker: {
      description: 'Docker commands',
      handler: (args, addLog) => {
        if (args[0] === 'ps') {
          addLog({ type: 'output', content: 'CONTAINER ID   NAME             STATUS      PORTS' });
          addLog({ type: 'output', content: '─'.repeat(60) });
          dockerContainers.forEach(c => {
            addLog({ type: 'output', content: `${c.id}       ${c.name.padEnd(16)} ${c.status.padEnd(11)} ${c.ports}` });
          });
        } else {
          addLog({ type: 'err', content: 'Usage: docker ps' });
        }
      },
    },
    sql: {
      description: 'Query skills database',
      handler: (args, addLog) => {
        const query = args.join(' ').toLowerCase();
        if (query.includes('select') && query.includes('skills')) {
          addLog({ type: 'output', content: '┌────────────────┬───────┬────────────────────┐' });
          addLog({ type: 'output', content: '│ SKILL          │ LEVEL │ TECHNOLOGIES       │' });
          addLog({ type: 'output', content: '├────────────────┼───────┼────────────────────┤' });
          skills.forEach(s => {
            const bar = '█'.repeat(Math.floor(s.level / 10)) + '░'.repeat(10 - Math.floor(s.level / 10));
            addLog({ type: 'output', content: `│ ${s.skill.padEnd(14)} │ ${bar} │ ${s.tech.padEnd(18)} │` });
          });
          addLog({ type: 'output', content: '└────────────────┴───────┴────────────────────┘' });
          addLog({ type: 'sys', content: `${skills.length} rows returned` });
        } else {
          addLog({ type: 'err', content: 'Syntax error. Try: sql "SELECT * FROM skills"' });
        }
      },
    },
    theme: {
      description: 'Change theme',
      handler: (args, addLog) => {
        const mode = args[0]?.toLowerCase();
        if (['dark', 'light', 'minimal'].includes(mode)) {
          addLog({ type: 'sys', content: `> Applying theme: ${mode.toUpperCase()}...` });
          setTimeout(() => {
            localStorage.setItem('user-theme', mode);
            onThemeChange?.(mode);
            addLog({ type: 'sys', content: `> Theme switched to ${mode.toUpperCase()}` });
            addLog({ type: 'sys', content: `> Preference saved to localStorage` });
          }, 300);
        } else {
          addLog({ type: 'err', content: 'Usage: theme <dark|light|minimal>' });
        }
      },
    },
    neofetch: {
      description: 'System information',
      handler: (_, addLog) => {
        const lines = [
          '        ▄▄▄▄▄▄▄         user@portfolio',
          '       ████████▌        ──────────────────',
          '      ▐████████▌        OS: BrutalistOS 2.0',
          '       ████████         Host: React 18.3.1',
          '        ▀▀▀▀▀▀          Kernel: Vite 5.x',
          '                        Shell: TypeScript',
          '   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄       DE: Tailwind CSS',
          '  ██████████████▌       Theme: Industrial',
          ' ▐██████████████▌       Terminal: xterm-256',
          '  ██████████████        CPU: Creativity @ 100%',
          '   ▀▀▀▀▀▀▀▀▀▀▀▀         Memory: Unlimited Ideas',
        ];
        lines.forEach(line => addLog({ type: 'ascii', content: line }));
      },
    },
    sudo: {
      description: 'Superuser command',
      handler: (_, addLog) => {
        addLog({ type: 'err', content: '⚠ Permission denied: Nice try, but you are not root here.' });
        addLog({ type: 'sys', content: '> This incident will be reported.' });
      },
    },
  };

  const executeCommand = useCallback((input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add to history
    commandHistory.current.push(trimmed);
    setHistoryIndex(-1);

    // Log the command
    addLog({ type: 'cmd', content: `$ ${trimmed}` });

    // Parse command and args
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Execute command
    const handler = commandMap[cmd];
    if (handler) {
      handler.handler(args, addLog);
    } else {
      addLog({ type: 'err', content: `Command not found: ${cmd}` });
      addLog({ type: 'sys', content: '> Type "help" for available commands' });
    }

    setInputValue('');
  }, [addLog, commandMap, onThemeChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const history = commandHistory.current;
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const history = commandHistory.current;
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInputValue('');
        } else {
          setHistoryIndex(newIndex);
          setInputValue(history[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const prefix = inputValue.toLowerCase();
      const commands = Object.keys(commandMap);
      const match = commands.find(cmd => cmd.startsWith(prefix));
      if (match) {
        setInputValue(match);
      }
    }
  }, [inputValue, historyIndex, executeCommand, commandMap]);

  return {
    logs,
    inputValue,
    setInputValue,
    handleKeyDown,
    executeCommand,
    commandMap,
  };
};
