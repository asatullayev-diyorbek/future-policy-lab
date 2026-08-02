export default function YoutubeEmbed({ videoId, dark }) {
  return (
    <div className={`my-8 rounded-2xl overflow-hidden aspect-video border ${dark ? "border-white/10" : "border-slate-200"}`}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
