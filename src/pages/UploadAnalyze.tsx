import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileAudio, CheckCircle, Loader2, RotateCcw } from "lucide-react";
import { HealthGauge } from "../components/dashboard/HealthGauge";
import { RiskIndicator } from "../components/dashboard/RiskIndicator";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type AnalysisResult = {
  healthScore: number;
  riskLevel: "healthy" | "warning" | "critical";
  faultType: string;
  confidence: number;
};

const machineTypes = ["Compressor", "Pump", "Fan", "Motor", "Turbine", "Conveyor Belt"];

const UploadAnalyze = () => {
  const [file, setFile] = useState<File | null>(null);
  const [machineType, setMachineType] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { user } = useAuth();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file || !machineType || !user) return;
    setAnalyzing(true);
    setResult(null);

    // Upload audio file to storage
    let audioPath = "";
    const filePath = `${user.id}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("audio-uploads")
      .upload(filePath, file);
    if (!uploadError) {
      audioPath = filePath;
    }

    // Mock ML inference (replace with real API later)
    await new Promise((r) => setTimeout(r, 2000));
    const mockScore = Math.floor(Math.random() * 60) + 40;
    const riskLevel: "healthy" | "warning" | "critical" = mockScore >= 70 ? "healthy" : mockScore >= 40 ? "warning" : "critical";
    const faultType = mockScore >= 70 ? "No Fault Detected" : mockScore >= 40 ? "Bearing Wear" : "Shaft Misalignment";
    const confidence = parseFloat((Math.random() * 15 + 82).toFixed(1));

    // Save to database
    await supabase.from("audio_analysis_history").insert({
      user_id: user.id,
      machine_type: machineType,
      uploaded_audio_path: audioPath,
      health_score: mockScore,
      risk_level: riskLevel,
      fault_type_prediction: faultType,
      confidence_score: confidence,
    });

    setResult({ healthScore: mockScore, riskLevel: riskLevel, faultType, confidence });
    setAnalyzing(false);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setMachineType("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Upload & Analyze</h2>
        <p className="text-sm text-muted-foreground mt-1">Upload audio data to analyze machine health</p>
      </div>

      {/* Upload Card */}
      <div className="industrial-card space-y-5">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`drop-zone text-center cursor-pointer ${dragOver ? "active" : ""}`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input id="file-input" type="file" accept="audio/*,.wav,.mp3,.flac" className="hidden" onChange={handleFileSelect} />
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileAudio className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-foreground font-medium">Drag & drop audio file here</p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse · WAV, MP3, FLAC</p>
            </>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Machine Type</label>
          <select
            value={machineType}
            onChange={(e) => setMachineType(e.target.value)}
            className="w-full bg-secondary text-foreground border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select machine type...</option>
            {machineTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={!file || !machineType || analyzing}
          className="w-full h-12 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
        >
          {analyzing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Analyzing Audio...
            </span>
          ) : "Analyze Audio"}
        </Button>
      </div>

      {/* Loading shimmer */}
      <AnimatePresence>
        {analyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="industrial-card space-y-4">
            <div className="h-4 w-1/3 rounded-full bg-secondary shimmer" />
            <div className="h-32 rounded-xl bg-secondary shimmer" />
            <div className="h-4 w-2/3 rounded-full bg-secondary shimmer" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="industrial-card space-y-6"
          >
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Analysis Complete</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <HealthGauge score={result.healthScore} size={180} />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                  <RiskIndicator level={result.riskLevel} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Fault Type</p>
                  <p className="text-lg font-semibold text-foreground">{result.faultType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                    <span className="text-sm font-mono font-bold text-primary">{result.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full rounded-xl border-border hover:bg-secondary">
              <RotateCcw className="w-4 h-4 mr-2" /> Analyze Another File
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UploadAnalyze;
