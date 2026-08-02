import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-blue-500/50"
const labelCls = "block text-xs font-semibold text-slate-400 mb-1.5"

export default function MarkdownField({ label, value, onChange }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        <label className={labelCls}>{label}</label>
        <textarea
          rows={18}
          value={value ?? ""}
          onChange={onChange}
          className={`${inputCls} resize-none font-mono text-xs leading-relaxed`}
        />
      </div>
      <div>
        <label className={labelCls}>Preview</label>
        <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 h-[420px] overflow-y-auto text-sm text-slate-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value || "*Nothing yet*"}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export { inputCls, labelCls }
