import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  className?: string;
}

const Heading1 = ({ children, className }: TextProps) => (
  <h1
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className
    )}
  >
    {children}
  </h1>
);

const Heading2 = ({ children, className }: TextProps) => (
  <h2
    className={cn(
      "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      className
    )}
  >
    {children}
  </h2>
);

const Heading3 = ({ children, className }: TextProps) => (
  <h3
    className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h3>
);

const Heading4 = ({ children, className }: TextProps) => (
  <h4
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h4>
);

const Heading5 = ({ children, className }: TextProps) => (
  <h5
    className={cn(
      "scroll-m-20 text-lg font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h5>
);

const Heading6 = ({ children, className }: TextProps) => (
  <h6
    className={cn(
      "scroll-m-20 text-base font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h6>
);

const Blockquote = ({ children, className }: TextProps) => (
  <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
    {children}
  </blockquote>
);

const Lead = ({ children, className }: TextProps) => (
  <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
);

const Large = ({ children, className }: TextProps) => (
  <p className={cn("text-lg font-semibold", className)}>{children}</p>
);

const Small = ({ children, className }: TextProps) => (
  <p className={cn("text-sm font-medium leading-none", className)}>
    {children}
  </p>
);

const Muted = ({ children, className }: TextProps) => (
  <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
);

const Paragraph = ({ children, className }: TextProps) => (
  <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
    {children}
  </p>
);

const UnorderedList = ({ children, className }: TextProps) => (
  <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
    {children}
  </ul>
);

const OrderedList = ({ children, className }: TextProps) => (
  <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}>
    {children}
  </ol>
);

const ListItem = ({ children, className }: TextProps) => (
  <li className={cn("", className)}>{children}</li>
);

const Bold = ({ children, className }: TextProps) => (
  <strong className={cn("font-medium", className)}>{children}</strong>
);

const Italic = ({ children, className }: TextProps) => (
  <em className={cn("italic", className)}>{children}</em>
);

const Underline = ({ children, className }: TextProps) => (
  <u className={cn("underline underline-offset-4", className)}>{children}</u>
);

const Strikethrough = ({ children, className }: TextProps) => (
  <s className={cn("line-through", className)}>{children}</s>
);

export {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Blockquote,
  Lead,
  Large,
  Small,
  Muted,
  Paragraph,
  UnorderedList,
  OrderedList,
  ListItem,
  Bold,
  Italic,
  Underline,
  Strikethrough,
};
