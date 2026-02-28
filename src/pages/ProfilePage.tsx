import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Building2, Shield, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@industrial.io",
    organization: "Industrial Systems Corp.",
    role: "Senior Engineer",
  });

  const handleSave = () => {
    toast.success("Profile updated successfully");
  };

  const fields = [
    { key: "name", label: "Full Name", icon: User },
    { key: "email", label: "Email Address", icon: Mail },
    { key: "organization", label: "Organization", icon: Building2 },
    { key: "role", label: "Role", icon: Shield },
  ] as const;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Profile Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your account information</p>
      </div>

      <div className="industrial-card space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
            AK
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Fields */}
        <div className="space-y-4">
          {fields.map(({ key, label, icon: Icon }) => (
            <div key={key}>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {label}
              </label>
              <input
                value={profile[key]}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          ))}
        </div>

        <div className="border-t border-border" />

        {/* Change Password */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Change Password
          </h3>
          <div className="space-y-3">
            <input type="password" placeholder="Current password" className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input type="password" placeholder="New password" className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input type="password" placeholder="Confirm new password" className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
