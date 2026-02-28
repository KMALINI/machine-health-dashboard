import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Building2, Shield, Lock, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setProfile({
          name: data.name || "",
          email: data.email || user.email || "",
          organization: data.organization || "",
          role: data.role || "",
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        name: profile.name,
        organization: profile.organization,
        role: profile.role,
      })
      .eq("user_id", user.id);

    if (newPassword) {
      if (newPassword !== confirmNewPassword) {
        toast.error("Passwords do not match");
        setSaving(false);
        return;
      }
      const { error: pwError } = await supabase.auth.updateUser({ password: newPassword });
      if (pwError) {
        toast.error(pwError.message);
        setSaving(false);
        return;
      }
      setNewPassword("");
      setConfirmNewPassword("");
    }

    setSaving(false);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
    }
  };

  const fields = [
    { key: "name", label: "Full Name", icon: User },
    { key: "email", label: "Email Address", icon: Mail, disabled: true },
    { key: "organization", label: "Organization", icon: Building2 },
    { key: "role", label: "Role", icon: Shield },
  ] as const;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Profile Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your account information</p>
      </div>

      <div className="industrial-card space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
            {profile.name.slice(0, 2).toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">{profile.name || "User"}</p>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
          </div>
        </div>

        <div className="border-t border-border" />

        <div className="space-y-4">
          {fields.map(({ key, label, icon: Icon, ...rest }) => (
            <div key={key}>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                <Icon className="w-4 h-4" /> {label}
              </label>
              <input
                value={profile[key]}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                disabled={"disabled" in rest}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
            </div>
          ))}
        </div>

        <div className="border-t border-border" />

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Change Password
          </h3>
          <div className="space-y-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
