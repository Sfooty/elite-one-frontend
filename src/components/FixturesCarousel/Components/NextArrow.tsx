import {ArrowRight} from "lucide-react";

export function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{...style, display: 'block'}}
      onClick={onClick}
    >
      <div className="rounded-full bg-primary-foreground h-10 w-10 border-2 border-secondary-foreground flex">
        <ArrowRight className={`text-secondary-foreground m-auto`} size={20}/>
      </div>
    </div>
  );
}
