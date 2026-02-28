import { Bell, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const { user } = useAuth();

  const displayName = user?.user_metadata?.name || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="status-dot bg-success" />
          <span className="text-sm text-muted-foreground">System Online</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-mono">
            {dateStr} · {timeStr}
          </span>
        </div>

        <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-tight">{displayName}</p>
            <p className="text-xs text-muted-foreground leading-tight">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
