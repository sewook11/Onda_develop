import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type MoreLinkButtonProps =
  | { href: string; onClick?: never; children: React.ReactNode }
  | { href?: never; onClick: () => void; children: React.ReactNode };

const MoreLinkButton = ({ href, onClick, children }: MoreLinkButtonProps) => {
  const baseStyle = 'inline-flex items-center text-base font-medium text-gray-600 hover:text-black cursor-pointer';
  const router = useRouter();

  if (href) {
    return (
      <div className={baseStyle} onClick={() => router.push(href)}>
        {children}
        <ChevronRight size={18} strokeWidth={2} className="ml-1 " />
      </div>
    );
  }

  return (
    <button onClick={onClick} className={baseStyle}>
      {children}
      <ChevronRight size={18} strokeWidth={2} className="ml-1 " />
    </button>
  );
};

export default MoreLinkButton;
