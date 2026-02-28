import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, User, Mail, Lock, Building2, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const roles = ["Engineer", "Technician", "Manager", "Analyst", "Admin"];

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, { name, organization, role });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created successfully!");
      navigate("/");
    }
  };

  const inputClass = "w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="industrial-card space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-primary mx-auto flex items-center justify-center glow-green">
              <Activity className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground">Join the Acoustic Fault Detection System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required className={inputClass} />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Password
                </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" required className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Confirm</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••" required className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Organization
              </label>
              <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Your company" className={inputClass} />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Role
              </label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
                <option value="">Select role...</option>
                {roles.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              {loading ? (
                <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</span>
              ) : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
