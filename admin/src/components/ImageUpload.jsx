import { useRef, useState } from "react"
import { Upload, X } from "lucide-react"
import { uploadImage } from "../utils/api"
import { inputCls, labelCls } from "./MarkdownField"

export default function ImageUpload({ label = "Cover image", value, onChange }) {
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file")
      return
    }
    setError("")
    setUploading(true)
    try {
      const url = await uploadImage(file)
      onChange(url)
    } catch (err) {
      setError(err.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex gap-2">
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
          placeholder="https://... or upload a file"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-colors disabled:opacity-60 shrink-0"
        >
          <Upload size={14} /> {uploading ? "Uploading..." : "Upload"}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>
      {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
      {value && (
        <div className="mt-2 relative inline-block">
          <img src={value} alt="" className="h-24 w-auto rounded-lg border border-white/10 object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center hover:bg-rose-500"
            title="Remove"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  )
}
