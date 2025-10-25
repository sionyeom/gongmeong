interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-md mx-auto px-4 py-4">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
      </div>
    </div>
  );
}
