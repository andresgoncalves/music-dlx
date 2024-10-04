interface PreviewModalProps {
  video: string;
  onClose: () => void;
}

export default function PreviewModal({ video, onClose }: PreviewModalProps) {
  return (
    <aside
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/75 p-4"
    >
      <iframe
        src={`https://www.youtube.com/embed/${encodeURIComponent(video)}`}
        className="aspect-video max-h-full w-full max-w-2xl overflow-hidden rounded-2xl"
      />
    </aside>
  );
}
