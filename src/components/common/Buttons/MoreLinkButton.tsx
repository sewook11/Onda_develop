import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type MoreLinkButtonProps =
  | { href: string; onClick?: never; children: React.ReactNode }
  | { href?: never; onClick: () => void; children: React.ReactNode };

const MoreLinkButton = ({ href, onClick, children }: MoreLinkButtonProps) => {
  const baseStyle =
    'inline-flex items-center text-base font-medium text-gray-600 hover:text-black';

  if (href) {
    return (
      <Link href={href} className={baseStyle}>
        {children}
        <ChevronRight size={18} strokeWidth={2} className="ml-1 text-gray-600" />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyle}>
      {children}
      <ChevronRight size={18} strokeWidth={2} className="ml-1 text-gray-600 hover:text-black" />
    </button>
  );
};

export default MoreLinkButton;
